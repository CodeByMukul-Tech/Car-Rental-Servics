from flask import Blueprint, request, jsonify
import mysql.connector

profile_bp = Blueprint('profile', __name__)

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Mukul2004@',
        database='car_rent_servics'
    )

@profile_bp.route('/profile', methods=['POST'])
def create_or_update_profile():
    userid = request.form.get('userid')
    username = request.form.get('username')
    state = request.form.get('state')
    city = request.form.get('city')
    house_address = request.form.get('house_address')
    phone_no = request.form.get('phone_no')
    image = request.files.get('image')
    role = request.form.get('role')

    if not userid:
        return jsonify({'message': 'User ID is missing!'}), 400

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Step 1: Check if user exists in users table
        cursor.execute('SELECT userid FROM users WHERE userid = %s', (userid,))
        user = cursor.fetchone()

        if not user:
            return jsonify({'message': 'User not found in users table!'}), 404

        # Step 2: Check if profile already exists in customer_information
        cursor.execute('SELECT userid FROM customer_information WHERE userid = %s', (userid,))
        existing_profile = cursor.fetchone()

        if existing_profile:
            return jsonify({'message': 'Profile already exists. You cannot create/update again!'}), 400

        # Step 3: Insert new profile
        if image:
            img_data = image.read()
            query = '''
                INSERT INTO customer_information (userid, username, state, city, house_address, phone_no, image, role)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            '''
            values = (userid, username, state, city, house_address, phone_no, img_data, role)
        else:
            query = '''
                INSERT INTO customer_information (userid, username, state, city, house_address, phone_no, role)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            '''
            values = (userid, username, state, city, house_address, phone_no, role)

        cursor.execute(query, values)
        conn.commit()

        return jsonify({'message': 'Information is created successfully!'}), 200

    except mysql.connector.Error as err:
        print(f"MySQL Error: {err}")
        return jsonify({'message': 'Database error occurred!'}), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'An unexpected error occurred!'}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

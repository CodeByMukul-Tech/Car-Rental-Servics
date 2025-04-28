from flask import Blueprint, request, jsonify
import mysql.connector
import base64

Home_bp = Blueprint('Home', __name__)

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Mukul2004@',
        database='car_rent_servics'
    )

@Home_bp.route('/user_info/<userid>', methods=['GET'])
def get_user_info(userid):
    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Fetch userid + image both
        cursor.execute('SELECT userid, image FROM customer_information WHERE userid = %s', (userid))
        user = cursor.fetchone()
        print(user)

        if not user:
            return jsonify({'message': 'User not found!'}), 404

        image_base64 = None
        if user.get('image'):
            image_base64 = base64.b64encode(user['image']).decode('utf-8')

        return jsonify({
            'userid': user['userid'],
            'image': image_base64
        }), 200

    except mysql.connector.Error as db_err:
        print(f"MySQL Error: {db_err}")
        print(db_err)
        return jsonify({'message': 'Database error!'}), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Server error occurred!'}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

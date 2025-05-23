# routes.py
from flask import Blueprint, request, jsonify
import mysql.connector
from mysql.connector import Error

# Create Blueprint object
Singup = Blueprint('Singup', __name__)

# Database Configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Mukul2004@',
    'database': 'car_rent_servics'
}

@Singup.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    emailid = data.get('email')
    userid = data.get('userid')
    password = data.get('password')

    if not emailid or not userid or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Check if emailid already registered
        cursor.execute("SELECT emailid FROM users WHERE emailid = %s", (emailid,))
        existing_email = cursor.fetchone()

        if existing_email:
            return jsonify({'message': 'Email already registered'}), 409

        # Check if userid already taken
        cursor.execute("SELECT userid FROM users WHERE userid = %s", (userid,))
        existing_userid = cursor.fetchone()

        if existing_userid:
            return jsonify({'message': 'User ID already taken'}), 409

        # Insert new user
        cursor.execute(
            "INSERT INTO users (emailid, userid, password) VALUES (%s, %s, %s)",
            (emailid, userid, password)
        )
        conn.commit()

        return jsonify({'message': 'Registration Successful'}), 201

    except Error as e:
        print("Error:", e)
        return jsonify({'message': 'Server Error'}), 500

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

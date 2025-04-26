from flask import Blueprint, request, jsonify, session
import mysql.connector
from mysql.connector import Error  # ⭐ Error catching ke liye
from datetime import datetime

login_bp = Blueprint('login', __name__)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Mukul2004@',
    'database': 'car_rent_servics'
}

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    print(data)
   
    try:
        # ⭐ Corrected connection
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        print(conn.is_connected())
        # Check if user exists
        cursor.execute('SELECT userid, emailid,password FROM users WHERE emailid=%s AND password=%s', (email, password))
        
        user = cursor.fetchone()
        print(user)

        if user:
            # Create session
            print(user['userid'])
            session['userid'] = user['userid']
           
            # Insert login history
            login_time = datetime.now()
            cursor.execute('''
                INSERT INTO login_history (email, password, login_time)
                VALUES (%s, %s, %s)
            ''', (email, password, login_time))
            conn.commit()

            return jsonify({
                'message': 'Login successful',
                'session_user_id': session['userid'],
               
            }), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401

    except Error as e:
        print(f"Database error: {e}")
        return jsonify({'message': 'Internal Server Error', 'error': str(e)}), 500

    except Exception as e:
        print(e)
        print(f"Unexpected error: {e}")
        return jsonify({'message': 'Unexpected Error', 'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

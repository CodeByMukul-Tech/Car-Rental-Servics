from flask import Blueprint, request, jsonify
import mysql.connector

booking_bp = Blueprint('booking_route', __name__)

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Mukul2004@',
        database='car_rent_servics'
    )

@booking_bp.route('/confirm-booking', methods=['POST'])
def confirm_booking():
    data = request.get_json()
    user_id = data.get('user_id')
    print(user_id)
    car_id = data.get('car_id')
    rent_date = data.get('rent_date')
    rent_time = data.get('rent_time')
    return_date = data.get('return_date')
    return_time = data.get('return_time')
    location = data.get('location')
    email_id = data.get('email_id')
    price = data.get('price')
    username = data.get('username')

    if not user_id:
        
        return jsonify({'error': 'User ID missing, please login'}), 401

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO booking_details 
            (user_id, car_id, rent_date, rent_time, return_date, return_time, location, email_id, price, username)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (user_id, car_id, rent_date, rent_time, return_date, return_time, location, email_id, price, username))

        conn.commit()

        # Get inserted booking id
        booking_id = cursor.lastrowid

        return jsonify({'message': 'Booking Confirmed', 'booking_id': booking_id}), 200

    except Exception as e:
        print(f"Error during booking: {e}")
        return jsonify({'error': 'Booking failed'}), 500

    finally:
        cursor.close()
        conn.close()

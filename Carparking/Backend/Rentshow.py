from flask import Blueprint, jsonify
import mysql.connector

car_bp = Blueprint('Rentshow', __name__)

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Mukul2004@',
        database='car_rent_servics'
    )

@car_bp.route('/all-cars', methods=['GET'])
def get_all_cars():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT 
                car_id,
                car_model,
                car_brand,
                car_type,
                car_price,
                first_owner_name,
                first_owner_state,
                year_of_manufacture,
                registration_number,
                engine_capacity_cc,
                car_image
            FROM car_details
        """)

        cars = cursor.fetchall()

        # Encode images to Base64
        for car in cars:
            if car['car_image']:
                import base64
                car['car_image'] = base64.b64encode(car['car_image']).decode('utf-8')
            else:
                car['car_image'] = None

        return jsonify(cars), 200

    except Exception as e:
        print(f"Error fetching car details: {e}")
        return jsonify({'error': 'Failed to fetch car details'}), 500

    finally:
        cursor.close()
        conn.close()

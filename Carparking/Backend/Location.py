from flask import Blueprint, jsonify
import mysql.connector

car_location_bp = Blueprint('car_location_bp', __name__)

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Mukul2004@',
        database='car_rent_servics'
    )

@car_location_bp.route('/car-location-data', methods=['GET'])
def get_car_location_data():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Fetch SUV, Sedan, Sports count per location
        locations = ['Delhi', 'Gujarat', 'Mumbai', 'Bangalore', 'Kolkata']
        result = {}

        for loc in locations:
            cursor.execute("""
                SELECT 
                    SUM(CASE WHEN car_type = 'SUV' THEN 1 ELSE 0 END) AS suv_count,
                    SUM(CASE WHEN car_type = 'Sedan' THEN 1 ELSE 0 END) AS sedan_count,
                    SUM(CASE WHEN car_type = 'Sports' THEN 1 ELSE 0 END) AS sports_count
                FROM car_details
                WHERE first_owner_state = %s
            """, (loc,))
            counts = cursor.fetchone()

            result[loc] = {
                'SUV': counts['suv_count'],
                'Sedan': counts['sedan_count'],
                'Sports': counts['sports_count']
            }

        return jsonify(result), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error retrieving car data'}), 500

    finally:
        cursor.close()
        conn.close()

from flask import Blueprint, request, jsonify
import mysql.connector
import base64

Car_create = Blueprint('Car_create', __name__)

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Mukul2004@",
    database="car_rent_servics"
)

cursor = db.cursor()

@Car_create.route('/add-car', methods=['POST'])
def add_car():
    data = request.form
    file = request.files.get('car_image')  # Get uploaded image

    user_role = data.get('role')
    if user_role != 'admin':
        return jsonify({'error': 'Access Denied: Only admins can add car details.'}), 403

    try:
        car_image_blob = file.read() if file else None

        sql = """
            INSERT INTO car_details 
            (car_model, car_brand, car_type, car_price, first_owner_name, first_owner_state, year_of_manufacture, registration_number, car_image, engine_capacity_cc)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data['car_model'],
            data['car_brand'],
            data['car_type'],
            data['car_price'],
            data['first_owner_name'],
            data['first_owner_state'],
            data['year_of_manufacture'],
            data['registration_number'],
            car_image_blob,            # Image comes first
            data['engine_capacity_cc'] # Then engine cc
        )

        cursor.execute(sql, values)
        db.commit()
        return jsonify({'message': 'Car added successfully!'}), 201

    except Exception as e:
        print(e)
        db.rollback()
        return jsonify({'error': str(e)}), 500

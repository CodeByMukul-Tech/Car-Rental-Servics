from flask import Flask
from flask_cors import CORS

# Import Blueprints
from Singup import Singup  # Corrected the import for signup blueprint
from login import login_bp  # Assuming you have a login blueprint
from logout import logout_bp  # Corrected the import for logout blueprint
from Profile import profile_bp  # Assuming you have a profile blueprint
from Home import Home_bp  # Assuming you have a home blueprint
from Car_create import Car_create  # Assuming you have a car creation blueprint
from Location import car_location_bp  # Assuming you have a car location blueprint
from Rentshow import car_bp  # Assuming you have a car rental show blueprint
from booking_route import booking_bp  # Assuming you have a booking route blueprint
# from Payment import Payment  # Payment blueprint
# from Payments import payment_bp  # Assuming you have a payment blueprint

app = Flask(__name__)

app.secret_key = 'your_secret_key'  # Set a secret key for session management

# Enable CORS for React (localhost:3000)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# Register Blueprints           
app.register_blueprint(Singup, url_prefix='/api')  # Prefix for signup API routes
app.register_blueprint(login_bp, url_prefix='/api')  # Prefix for login API routes
app.register_blueprint(logout_bp, url_prefix='/api')  # Prefix for logout API routes
app.register_blueprint(profile_bp, url_prefix='/api')  # Prefix for profile API routes
app.register_blueprint(Home_bp, url_prefix='/api')  # Prefix for home API routes
app.register_blueprint(Car_create, url_prefix='/api')  # Prefix for car creation API routes
app.register_blueprint(car_location_bp, url_prefix='/api')  # Prefix for car location API routes
app.register_blueprint(car_bp, url_prefix='/api')  # Prefix for car rental show API routes
app.register_blueprint(booking_bp, url_prefix='/api')  # Prefix for booking API routes
# app.register_blueprint(payment_bp, url_prefix='/api')  # Prefix for payment API routes

if __name__ == '__main__':
    app.run(debug=True)

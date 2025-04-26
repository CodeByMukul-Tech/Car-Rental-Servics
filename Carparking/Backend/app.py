from flask import Flask
from flask_cors import CORS

# Import Blueprints
# from Singup import signup_bp  # Fixed the typo in the import (Signup)
from login import login_bp  # Assuming you have a login blueprint
from logout import logout_bp  # Corrected the import for logout blueprint
from Singup import Singup  # Assuming you have a signup blueprint



app = Flask(__name__)

app.secret_key = 'your_secret_key'  # Set a secret key for session management

# Enable CORS for React (localhost:3000)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# Register Blueprints
app.register_blueprint(Singup, url_prefix='/api')  # Prefix for signup API routes
app.register_blueprint(login_bp, url_prefix='/api')  # Prefix for login API routes
app.register_blueprint(logout_bp, url_prefix='/api')  # Prefix for logout API routes

if __name__ == '__main__':
    app.run(debug=True)

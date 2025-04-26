from flask import Blueprint, session, jsonify

# Define the Blueprint
logout_bp = Blueprint("logout", __name__)

# Logout route
@logout_bp.route("/logout", methods=["POST"])
def logout():
    session.clear()  # Clear session data
    return jsonify({"message": "Logged out successfully"}), 200

from flask import Blueprint, request, jsonify

from app.services.auth_service import (
    login_user,
    register_user
)

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    username = data.get("username")
    password = data.get("password")

    if not username:
        return jsonify({
            "error": "Username is required"
        }), 400

    if not password:
        return jsonify({
            "error": "Password is required"
        }), 400

    result, status_code = login_user(username, password)

    return jsonify(result), status_code

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.json

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    username = data.get("username")
    password = data.get("password")

    if not username:
        return jsonify({
            "error": "Username is required"
        }), 400

    if not password:
        return jsonify({
            "error": "Password is required"
        }), 400

    result, status_code = register_user(
        username,
        password
    )

    return jsonify(result), status_code
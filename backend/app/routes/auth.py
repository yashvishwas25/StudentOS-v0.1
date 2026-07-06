from flask import Blueprint, request, jsonify

from app.services.auth_service import (
    login_user,
    register_user
)

from app.utils.validators import validate_auth_data

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    valid, cleaned_data, error = validate_auth_data(data)

    if not valid:
        return jsonify(error), 400

    username = cleaned_data["username"]
    password = cleaned_data["password"]

    result, status_code = login_user(
        username,
        password
    )

    return jsonify(result), status_code


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.json

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    valid, cleaned_data, error = validate_auth_data(data)

    if not valid:
        return jsonify(error), 400

    username = cleaned_data["username"]
    password = cleaned_data["password"]

    result, status_code = register_user(
        username,
        password
    )

    return jsonify(result), status_code
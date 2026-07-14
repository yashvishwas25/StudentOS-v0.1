from flask import Blueprint, jsonify, request

from app.utils.exceptions import AppError
from app.utils.constants import HTTP_400_BAD_REQUEST

from flask import current_app
from app.utils.responses import success_response

health_bp = Blueprint("health", __name__)


@health_bp.route("/")
def home():
    return "Welcome to StudentOS v0.1"


@health_bp.route("/status")
def status():
    return "StudentOS Backend Running"


@health_bp.route("/api/health")
def api_health():
    return jsonify({
        "status": "healthy",
        "project": "StudentOS v0.1",
        "version": "0.1"
    }), 200


@health_bp.route("/api/info")
def api_info():
    return jsonify({
        "module": "Beckend",
        "api": "StudentOS",
        "version": "0.1"
    }), 200


@health_bp.route("/api/greet")
def greet():
    name = request.args.get("name")

    return jsonify({
        "message": f"Hello {name}"
    }), 200


@health_bp.route("/api/student")
def student():
    name = request.args.get("name")
    semester = request.args.get("semester")

    return jsonify({
        "name": name,
        "semester": semester
    }), 200


@health_bp.route("/api/student/create", methods=["POST"])
def create_student():

    data = request.json

    name = data.get("name")
    semester = data.get("semester")
    branch = data.get("branch")

    print("NAME VALUE =", name)

    if not name:
        return jsonify({
            "error": "Name is required"
        }), 400

    return jsonify({
        "message": "Student created",
        "student": {
            "name": name,
            "semester": semester,
            "branch": branch
        }
    }), 201


@health_bp.route("/api/login", methods=["POST"])
def login():

    data = request.json

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({
            "error": "Username and Password are required"
        }), 400

    if username == "yash" and password == "1234":
        return jsonify({
            "message": "Login successful"
        }), 200

    return jsonify({
        "error": "Invalid credentials"
    }), 401

    
@health_bp.route("/api/error-test")
def error_test():
    raise AppError(
        "This is a custom exception test",
        HTTP_400_BAD_REQUEST
    )
    
@health_bp.route("/config")
def config_info():
    return success_response({
        "app_name": current_app.config["APP_NAME"],
        "debug": current_app.config["DEBUG"],
    })
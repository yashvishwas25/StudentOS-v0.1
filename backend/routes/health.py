from flask import Blueprint, jsonify, request

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
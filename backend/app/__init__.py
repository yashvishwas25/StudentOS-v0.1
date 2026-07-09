from flask import Flask

from app.routes.health import health_bp
from app.routes.auth import auth_bp
from app.utils.error_handlers import register_error_handlers

def create_app():
    app = Flask(__name__)

    app.register_blueprint(health_bp)
    app.register_blueprint(auth_bp)

    register_error_handlers(app)

    return app
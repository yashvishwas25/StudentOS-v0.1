from flask import Flask
from app.routes.health import health_bp
from app.routes.auth import auth_bp
from app.utils.error_handlers import register_error_handlers
from dotenv import load_dotenv
from app.config import Config
from app.database.db import db
from app.utils.logger import logger
from app.models.user import User

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    with app.app_context():
        db.create_all()
        logger.info("Database tables created successfully")
    logger.info("Database initialized successfully")

    app.register_blueprint(health_bp)
    app.register_blueprint(auth_bp)

    register_error_handlers(app)

    return app
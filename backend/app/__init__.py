from flask import Flask
from app.routes.health import health_bp
from app.routes.auth import auth_bp
from app.utils.error_handlers import register_error_handlers
from dotenv import load_dotenv
from app.config import Config
from app.database.db import db, migrate
from app.utils.logger import logger
from app.utils.jwt_manager import jwt
from app.models.user import User
from app.models.project import Project
from app.models.assignment import Assignment
from app.routes.projects import projects_bp
from app.routes.assignments import assignments_bp
from app.models.file import File
from app.routes.files import files_bp

load_dotenv()


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    logger.info("Database initialized successfully")

    app.register_blueprint(health_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(projects_bp)
    app.register_blueprint(assignments_bp)
    app.register_blueprint(files_bp)

    register_error_handlers(app)

    return app
from flask import Blueprint

profile_bp = Blueprint("profile", __name__)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)
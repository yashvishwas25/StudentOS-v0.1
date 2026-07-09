from flask import Blueprint, request
from app.utils.exceptions import AppError

from app.utils.responses import (
    success_response,
    error_response
)

from app.utils.constants import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED
)

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
        raise AppError(
        "Request body is required",
        HTTP_400_BAD_REQUEST
    )

    valid, cleaned_data, error = validate_auth_data(data)

    if not valid:
        raise AppError(
        error,
        HTTP_400_BAD_REQUEST
    ) 

    username = cleaned_data["username"]
    password = cleaned_data["password"]

    success, message = login_user(
        username,
        password
    )

    if not success:
        raise AppError(
        message,
        HTTP_401_UNAUTHORIZED
    )

    return success_response(message)


@auth_bp.route("/register", methods=["POST"])
def register():

    valid, cleaned_data, error = validate_auth_data(request.json)

    if not valid:
        raise AppError(
        error,
        HTTP_400_BAD_REQUEST
    )
    
    username = cleaned_data["username"]
    password = cleaned_data["password"]
    
    success, message = register_user(
        username,
        password
    )

    if not success:
        raise AppError(
        message,
        HTTP_400_BAD_REQUEST
    )

    return success_response(
        message,
        status_code=HTTP_201_CREATED
    )
 
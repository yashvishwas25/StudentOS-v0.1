from app.utils.logger import logger
from app.repositories.user_repository import UserRepository
from flask_jwt_extended import create_access_token

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)


def login_user(username, password):

    user = UserRepository.get_by_username(
        username
    )

    if (
        user
        and check_password_hash(
            user.password,
            password
        )
    ):

        logger.info(
            f"User '{username}' logged in successfully"
        )

        token = create_access_token(
            identity=user.username
        )

        return True, "Login successful", token

    logger.warning(
        f"Failed login attempt for username '{username}'"
    )

    return False, "Invalid username or password", None


def register_user(username, password):

    existing_user = UserRepository.get_by_username(
        username
    )

    if existing_user:
        logger.warning(
            f"Registration failed. Username '{username}' already exists"
        )

        return False, "Username already exists"

    password_hash = generate_password_hash(
        password
    )

    UserRepository.create_user(
        username,
        password_hash
    )

    logger.info(
        f"New user registered: '{username}'"
    )

    return True, "User registered successfully"
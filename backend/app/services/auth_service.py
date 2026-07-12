from app.models.user import User
from app.database.db import db
from app.utils.logger import logger

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

def login_user(username, password):

    user = User.query.filter_by(
        username=username
    ).first()

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
        return True, "Login successful"

    logger.warning(
        f"Failed login attempt for username '{username}'"
    )

    return False, "Invalid username or password"

def register_user(username, password):

    existing_user = User.query.filter_by(
        username=username
    ).first()

    if existing_user:
        logger.warning(
            f"Registration failed. Username '{username}' already exists"
        )
        return False, "Username already exists"

    hashed_password = generate_password_hash(password)

    new_user = User(
        username=username,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    logger.info(f"New user registered: '{username}'")

    return True, "User registered successfully"
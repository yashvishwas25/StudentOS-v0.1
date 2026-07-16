from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from app.utils.exceptions import AppError
from app.utils.responses import success_response
from app.utils.constants import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)

from app.services.project_service import (
    create_project
)

from app.utils.project_validators import (
    validate_project_data
)


projects_bp = Blueprint(
    "projects",
    __name__
)


@projects_bp.route(
    "/projects",
    methods=["POST"]
)
@jwt_required()
def create_new_project():

    valid, cleaned_data, error = (
        validate_project_data(
            request.json
        )
    )

    if not valid:
        raise AppError(
            error,
            HTTP_400_BAD_REQUEST
        )

    user_id = int(
        get_jwt_identity()
    )

    success, message, project = (
        create_project(
            cleaned_data["name"],
            user_id
        )
    )

    return success_response(
        message,
        data={
            "id": project.id,
            "name": project.name,
            "user_id": project.user_id
        },
        status_code=HTTP_201_CREATED
    )
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

from app.utils.project_validators import (
    validate_project_data,
    validate_update_project_data
)

from app.services.project_service import (
    create_project,
    get_user_projects,
    get_project,
    delete_project,
    update_project
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


@projects_bp.route(
    "/projects",
    methods=["GET"]
)
@jwt_required()
def get_projects():

    user_id = int(
        get_jwt_identity()
    )

    page = request.args.get(
        "page",
        default=1,
        type=int
    )

    per_page = request.args.get(
        "per_page",
        default=5,
        type=int
    )

    search = request.args.get(
        "search",
        default=None,
        type=str
    )

    success, pagination = (
        get_user_projects(
            user_id,
            page,
            per_page,
            search
        )
    )

    return success_response(
        "Projects fetched successfully",
        data={
            "items": [
                {
                    "id": project.id,
                    "name": project.name
                }
                for project in pagination.items
            ],
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total": pagination.total,
            "pages": pagination.pages
        }
    )


@projects_bp.route(
    "/projects/<int:project_id>",
    methods=["GET"]
)
@jwt_required()
def get_single_project(project_id):

    user_id = int(
        get_jwt_identity()
    )

    project = get_project(
        project_id
    )

    if not project:
        raise AppError(
            "Project not found",
            404
        )

    if project.user_id != user_id:
        raise AppError(
            "Access denied",
            403
        )

    return success_response(
        "Project fetched successfully",
        data={
            "id": project.id,
            "name": project.name
        }
    )


@projects_bp.route(
    "/projects/<int:project_id>",
    methods=["PUT"]
)
@jwt_required()
def edit_project(project_id):

    user_id = int(
        get_jwt_identity()
    )

    project = get_project(
        project_id
    )

    if not project:
        raise AppError(
            "Project not found",
            404
        )

    if project.user_id != user_id:
        raise AppError(
            "Access denied",
            403
        )

    valid, cleaned_data, error = (
        validate_update_project_data(
            request.json
        )
    )

    if not valid:
        raise AppError(
            error,
            HTTP_400_BAD_REQUEST
        )

    success, message, updated_project = (
        update_project(
            project,
            cleaned_data["name"]
        )
    )

    return success_response(
        message,
        data={
            "id": updated_project.id,
            "name": updated_project.name
        }
    )


@projects_bp.route(
    "/projects/<int:project_id>",
    methods=["DELETE"]
)
@jwt_required()
def remove_project(project_id):

    user_id = int(
        get_jwt_identity()
    )

    project = get_project(
        project_id
    )

    if not project:
        raise AppError(
            "Project not found",
            404
        )

    if project.user_id != user_id:
        raise AppError(
            "Access denied",
            403
        )

    success, message = delete_project(
        project
    )

    return success_response(
        message
    )
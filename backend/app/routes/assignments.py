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

from app.utils.assignment_validators import (
    validate_assignment_data,
    validate_update_assignment_data
)

from app.services.assignment_service import (
    create_assignment,
    get_user_assignments,
    get_assignment,
    delete_assignment,
    update_assignment
)

assignments_bp = Blueprint(
    "assignments",
    __name__
)


@assignments_bp.route(
    "/assignments",
    methods=["POST"]
)
@jwt_required()
def create_new_assignment():

    valid, cleaned_data, error = (
        validate_assignment_data(
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

    success, message, assignment = (
        create_assignment(
            cleaned_data["title"],
            cleaned_data["description"],
            cleaned_data["due_date"],
            cleaned_data["status"],
            user_id
        )
    )

    return success_response(
        message,
        data={
            "id": assignment.id,
            "title": assignment.title
        },
        status_code=HTTP_201_CREATED
    )


@assignments_bp.route(
    "/assignments",
    methods=["GET"]
)
@jwt_required()
def get_assignments():

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

    success, pagination = (
        get_user_assignments(
            user_id,
            page,
            per_page
        )
    )

    return success_response(
        "Assignments fetched successfully",
        data={
            "items": [
                {
                    "id": assignment.id,
                    "title": assignment.title,
                    "status": assignment.status
                }
                for assignment in pagination.items
            ],
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total": pagination.total,
            "pages": pagination.pages
        }
    )


@assignments_bp.route(
    "/assignments/<int:assignment_id>",
    methods=["GET"]
)
@jwt_required()
def get_single_assignment(
    assignment_id
):

    user_id = int(
        get_jwt_identity()
    )

    assignment = get_assignment(
        assignment_id
    )

    if not assignment:
        raise AppError(
            "Assignment not found",
            404
        )

    if assignment.user_id != user_id:
        raise AppError(
            "Access denied",
            403
        )

    return success_response(
        "Assignment fetched successfully",
        data={
            "id": assignment.id,
            "title": assignment.title,
            "description": assignment.description,
            "due_date": assignment.due_date,
            "status": assignment.status
        }
    )


@assignments_bp.route(
    "/assignments/<int:assignment_id>",
    methods=["PUT"]
)
@jwt_required()
def edit_assignment(
    assignment_id
):

    user_id = int(
        get_jwt_identity()
    )

    assignment = get_assignment(
        assignment_id
    )

    if not assignment:
        raise AppError(
            "Assignment not found",
            404
        )

    if assignment.user_id != user_id:
        raise AppError(
            "Access denied",
            403
        )

    valid, cleaned_data, error = (
        validate_update_assignment_data(
            request.json
        )
    )

    if not valid:
        raise AppError(
            error,
            HTTP_400_BAD_REQUEST
        )

    success, message, updated_assignment = (
        update_assignment(
            assignment,
            cleaned_data["title"],
            cleaned_data["description"],
            cleaned_data["due_date"],
            cleaned_data["status"]
        )
    )

    return success_response(
        message,
        data={
            "id": updated_assignment.id,
            "title": updated_assignment.title,
            "description": updated_assignment.description,
            "due_date": updated_assignment.due_date,
            "status": updated_assignment.status
        }
    )


@assignments_bp.route(
    "/assignments/<int:assignment_id>",
    methods=["DELETE"]
)
@jwt_required()
def remove_assignment(
    assignment_id
):

    user_id = int(
        get_jwt_identity()
    )

    assignment = get_assignment(
        assignment_id
    )

    if not assignment:
        raise AppError(
            "Assignment not found",
            404
        )

    if assignment.user_id != user_id:
        raise AppError(
            "Access denied",
            403
        )

    success, message = (
        delete_assignment(
            assignment
        )
    )

    return success_response(
        message
    )
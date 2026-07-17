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

from app.utils.file_validators import (
    validate_file_data
)

from app.services.file_service import (
    create_file,
    get_user_files,
    get_file,
    delete_file
)

files_bp = Blueprint(
    "files",
    __name__
)


@files_bp.route(
    "/files",
    methods=["POST"]
)
@jwt_required()
def create_new_file():

    valid, cleaned_data, error = (
        validate_file_data(
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

    success, message, file = (
        create_file(
            cleaned_data["filename"],
            cleaned_data["file_type"],
            cleaned_data["file_path"],
            user_id
        )
    )

    return success_response(
        message,
        data={
            "id": file.id,
            "filename": file.filename,
            "file_type": file.file_type
        },
        status_code=HTTP_201_CREATED
    )


@files_bp.route(
    "/files",
    methods=["GET"]
)
@jwt_required()
def get_files():

    user_id = int(
        get_jwt_identity()
    )

    success, files = (
        get_user_files(
            user_id
        )
    )

    return success_response(
        "Files fetched successfully",
        data=[
            {
                "id": file.id,
                "filename": file.filename,
                "file_type": file.file_type
            }
            for file in files
        ]
    )


@files_bp.route(
    "/files/<int:file_id>",
    methods=["GET"]
)
@jwt_required()
def get_single_file(file_id):

    user_id = int(
        get_jwt_identity()
    )

    file = get_file(
        file_id
    )

    if not file:
        raise AppError(
            "File not found",
            404
        )

    if file.user_id != user_id:
        raise AppError(
            "Access denied",
            403
        )

    return success_response(
        "File fetched successfully",
        data={
            "id": file.id,
            "filename": file.filename,
            "file_type": file.file_type,
            "file_path": file.file_path
        }
    )


@files_bp.route(
    "/files/<int:file_id>",
    methods=["DELETE"]
)
@jwt_required()
def remove_file(file_id):

    user_id = int(
        get_jwt_identity()
    )

    file = get_file(
        file_id
    )

    if not file:
        raise AppError(
            "File not found",
            404
        )

    if file.user_id != user_id:
        raise AppError(
            "Access denied",
            403
        )

    success, message = (
        delete_file(file)
    )

    return success_response(
        message
    )
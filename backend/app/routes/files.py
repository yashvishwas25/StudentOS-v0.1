from flask import (
    Blueprint,
    request
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from app.utils.exceptions import AppError
from app.utils.responses import success_response
from app.utils.constants import (
    HTTP_201_CREATED
)

from app.services.file_service import (
    upload_file,
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

    print("REQUEST FILES =", request.files)
    print("REQUEST FORM =", request.form)

    file = request.files.get("file")

    user_id = int(
        get_jwt_identity()
    )

    uploaded_file = upload_file(
        file,
        user_id
    )

    return success_response(
        "File uploaded successfully",
        data={
            "id": uploaded_file.id,
            "filename": uploaded_file.filename,
            "file_type": uploaded_file.file_type,
            "file_path": uploaded_file.file_path
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

    file_type = request.args.get(
        "file_type",
        default=None,
        type=str
    )

    success, pagination = (
        get_user_files(
            user_id,
            page,
            per_page,
            search,
            file_type
        )
    )

    return success_response(
        "Files fetched successfully",
        data={
            "items": [
                {
                    "id": file.id,
                    "filename": file.filename,
                    "file_type": file.file_type
                }
                for file in pagination.items
            ],
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total": pagination.total,
            "pages": pagination.pages
        }
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
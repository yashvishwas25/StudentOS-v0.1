import os

from flask import current_app

from werkzeug.utils import (
    secure_filename
)

from app.utils.exceptions import (
    AppError
)

from app.repositories.file_repository import (
    FileRepository
)


def upload_file(
    file,
    user_id
):

    if not file:
        raise AppError(
            "File is required",
            400
        )

    filename = secure_filename(
        file.filename
    )

    if filename == "":
        raise AppError(
            "Invalid filename",
            400
        )

    upload_folder = (
        current_app.config[
            "UPLOAD_FOLDER"
        ]
    )

    file_path = os.path.join(
        upload_folder,
        filename
    )

    file.save(
        file_path
    )

    file_type = (
        filename.split(".")[-1]
        if "." in filename
        else "unknown"
    )

    uploaded_file = (
        FileRepository.create_file(
            filename,
            file_type,
            file_path,
            user_id
        )
    )

    return uploaded_file


def get_user_files(
    user_id,
    page=1,
    per_page=5
):

    files = (
        FileRepository.get_files_by_user(
            user_id=user_id,
            page=page,
            per_page=per_page
        )
    )

    return (
        True,
        files
    )


def get_file(
    file_id
):

    return (
        FileRepository.get_file_by_id(
            file_id
        )
    )


def delete_file(
    file
):

    if (
        file.file_path
        and
        os.path.exists(
            file.file_path
        )
    ):
        os.remove(
            file.file_path
        )

    FileRepository.delete_file(
        file
    )

    return (
        True,
        "File deleted successfully"
    )
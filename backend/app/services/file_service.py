from app.repositories.file_repository import (
    FileRepository
)


def create_file(
    filename,
    file_type,
    file_path,
    user_id
):

    file = (
        FileRepository.create_file(
            filename,
            file_type,
            file_path,
            user_id
        )
    )

    return (
        True,
        "File created successfully",
        file
    )


def get_user_files(
    user_id
):

    files = (
        FileRepository.get_files_by_user(
            user_id
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

    FileRepository.delete_file(
        file
    )

    return (
        True,
        "File deleted successfully"
    )
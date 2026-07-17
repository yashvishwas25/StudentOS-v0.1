from app.models.file import File
from app.database.db import db


class FileRepository:

    @staticmethod
    def create_file(
        filename,
        file_type,
        file_path,
        user_id
    ):

        file = File(
            filename=filename,
            file_type=file_type,
            file_path=file_path,
            user_id=user_id
        )

        db.session.add(file)
        db.session.commit()

        return file

    @staticmethod
    def get_files_by_user(
        user_id
    ):

        return File.query.filter_by(
            user_id=user_id
        ).all()

    @staticmethod
    def get_file_by_id(
        file_id
    ):

        return File.query.get(
            file_id
        )

    @staticmethod
    def delete_file(
        file
    ):

        db.session.delete(
            file
        )

        db.session.commit()
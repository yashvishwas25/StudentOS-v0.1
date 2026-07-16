from app.models.project import Project
from app.database.db import db


class ProjectRepository:

    @staticmethod
    def create_project(name, user_id):

        project = Project(
            name=name,
            user_id=user_id
        )

        db.session.add(project)
        db.session.commit()

        return project

    @staticmethod
    def get_projects_by_user(user_id):

        return Project.query.filter_by(
            user_id=user_id
        ).all()
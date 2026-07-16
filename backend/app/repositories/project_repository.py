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
        
    @staticmethod
    def get_project_by_id(project_id):

        return Project.query.get(project_id)

    @staticmethod
    def delete_project(project):

        db.session.delete(project)
        db.session.commit()
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
    def get_projects_by_user(
        user_id,
        page=1,
        per_page=5,
        search=None
    ):

        query = Project.query.filter_by(
            user_id=user_id
        )

        if search:
            query = query.filter(
                Project.name.ilike(
                    f"%{search}%"
                )
            )

        return query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )

    @staticmethod
    def get_project_by_id(project_id):

        return Project.query.get(project_id)

    @staticmethod
    def delete_project(project):

        db.session.delete(project)
        db.session.commit()

    @staticmethod
    def update_project(project, name):

        project.name = name

        db.session.commit()

        return project
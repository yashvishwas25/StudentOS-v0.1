from app.models.assignment import Assignment
from app.database.db import db


class AssignmentRepository:

    @staticmethod
    def create_assignment(
        title,
        description,
        due_date,
        status,
        user_id
    ):

        assignment = Assignment(
            title=title,
            description=description,
            due_date=due_date,
            status=status,
            user_id=user_id
        )

        db.session.add(assignment)
        db.session.commit()

        return assignment

    @staticmethod
    def get_assignments_by_user(user_id):

        return Assignment.query.filter_by(
            user_id=user_id
        ).all()

    @staticmethod
    def get_assignment_by_id(
        assignment_id
    ):

        return Assignment.query.get(
            assignment_id
        )

    @staticmethod
    def update_assignment(
        assignment
    ):

        db.session.commit()

        return assignment

    @staticmethod
    def delete_assignment(
        assignment
    ):

        db.session.delete(
            assignment
        )

        db.session.commit()
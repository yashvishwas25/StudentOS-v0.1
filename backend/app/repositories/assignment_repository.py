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
    def get_assignments_by_user(
        user_id,
        page=1,
        per_page=5
    ):

        return Assignment.query.filter_by(
            user_id=user_id
        ).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )

    @staticmethod
    def get_assignment_by_id(
        assignment_id
    ):

        return Assignment.query.get(
            assignment_id
        )

    @staticmethod
    def update_assignment(
        assignment,
        title,
        description,
        due_date,
        status
    ):

        assignment.title = title
        assignment.description = description
        assignment.due_date = due_date
        assignment.status = status

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
from app.repositories.assignment_repository import (
    AssignmentRepository
)


def create_assignment(
    title,
    description,
    due_date,
    status,
    user_id
):

    assignment = (
        AssignmentRepository.create_assignment(
            title,
            description,
            due_date,
            status,
            user_id
        )
    )

    return (
        True,
        "Assignment created successfully",
        assignment
    )


def get_user_assignments(
    user_id
):

    assignments = (
        AssignmentRepository.get_assignments_by_user(
            user_id
        )
    )

    return (
        True,
        assignments
    )


def get_assignment(
    assignment_id
):

    return (
        AssignmentRepository.get_assignment_by_id(
            assignment_id
        )
    )


def delete_assignment(
    assignment
):

    AssignmentRepository.delete_assignment(
        assignment
    )

    return (
        True,
        "Assignment deleted successfully"
    )
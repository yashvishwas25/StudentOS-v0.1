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
    user_id,
    page=1,
    per_page=5,
    search=None,
    status=None
):

    assignments = (
        AssignmentRepository.get_assignments_by_user(
            user_id=user_id,
            page=page,
            per_page=per_page,
            search=search,
            status=status
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


def update_assignment(
    assignment,
    title,
    description,
    due_date,
    status
):

    updated_assignment = (
        AssignmentRepository.update_assignment(
            assignment,
            title,
            description,
            due_date,
            status
        )
    )

    return (
        True,
        "Assignment updated successfully",
        updated_assignment
    )
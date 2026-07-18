from app.repositories.project_repository import (
    ProjectRepository
)


def create_project(name, user_id):

    project = ProjectRepository.create_project(
        name,
        user_id
    )

    return (
        True,
        "Project created successfully",
        project
    )


def get_user_projects(
    user_id,
    page=1,
    per_page=5
):

    projects = ProjectRepository.get_projects_by_user(
        user_id=user_id,
        page=page,
        per_page=per_page
    )

    return (
        True,
        projects
    )


def get_project(project_id):

    project = ProjectRepository.get_project_by_id(
        project_id
    )

    return project


def delete_project(project):

    ProjectRepository.delete_project(
        project
    )

    return (
        True,
        "Project deleted successfully"
    )


def update_project(project, name):

    updated_project = (
        ProjectRepository.update_project(
            project,
            name
        )
    )

    return (
        True,
        "Project updated successfully",
        updated_project
    )
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


def get_user_projects(user_id):

    projects = ProjectRepository.get_projects_by_user(
        user_id
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
def validate_project_data(data):

    if not data:
        return (
            False,
            None,
            "Request body is required"
        )

    name = data.get("name")

    if not name:
        return (
            False,
            None,
            "Project name is required"
        )

    name = name.strip()

    if len(name) < 3:
        return (
            False,
            None,
            "Project name must be at least 3 characters"
        )

    cleaned_data = {
        "name": name
    }

    return (
        True,
        cleaned_data,
        None
    )
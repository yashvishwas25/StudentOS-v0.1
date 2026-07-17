def validate_assignment_data(data):

    if not data:
        return (
            False,
            None,
            "Request body is required"
        )

    title = data.get("title")

    if not title:
        return (
            False,
            None,
            "Assignment title is required"
        )

    title = title.strip()

    if len(title) < 3:
        return (
            False,
            None,
            "Assignment title must be at least 3 characters"
        )

    cleaned_data = {
        "title": title,
        "description": data.get(
            "description",
            ""
        ),
        "due_date": data.get(
            "due_date",
            ""
        ),
        "status": data.get(
            "status",
            "pending"
        )
    }

    return (
        True,
        cleaned_data,
        None
    )
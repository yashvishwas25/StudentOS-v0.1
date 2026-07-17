def validate_file_data(data):

    if not data:
        return (
            False,
            None,
            "Request body is required"
        )

    filename = data.get("filename")
    file_type = data.get("file_type")
    file_path = data.get("file_path")

    if not filename:
        return (
            False,
            None,
            "Filename is required"
        )

    if not file_type:
        return (
            False,
            None,
            "File type is required"
        )

    if not file_path:
        return (
            False,
            None,
            "File path is required"
        )

    cleaned_data = {
        "filename": filename.strip(),
        "file_type": file_type.strip(),
        "file_path": file_path.strip()
    }

    return (
        True,
        cleaned_data,
        None
    )
def validate_auth_data(data):
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return False, {
            "error": "Username and password are required"
        }

    return True, None
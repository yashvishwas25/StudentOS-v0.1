def validate_auth_data(data):

    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if not username:
        return False, None, {
            "error": "Username is required"
        }

    if not password:
        return False, None, {
            "error": "Password is required"
        }

    if len(username) < 3:
        return False, None, {
            "error": "Username must be at least 3 characters"
        }

    if len(password) < 6:
        return False, None, {
            "error": "Password must be at least 6 characters"
        }

    cleaned_data = {
        "username": username,
        "password": password
    }

    return True, cleaned_data, None
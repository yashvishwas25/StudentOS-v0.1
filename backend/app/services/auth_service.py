from app.data.users import users


def login_user(username, password):

    for user in users:

        if (
            user["username"] == username
            and user["password"] == password
        ):
            return {
                "message": "Login successful"
            }, 200

    return {
        "error": "Invalid username or password"
    }, 401
    
def register_user(username, password):

    for user in users:

        if user["username"] == username:
            return {
                "error": "Username already exists"
            }, 400

    users.append({
        "username": username,
        "password": password
    })

    return {
        "message": "User registered successfully"
    }, 201
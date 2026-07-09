from app.data.users import users


def login_user(username, password):

    for user in users:

        if (
            user["username"] == username
            and user["password"] == password
        ):
            return True, "Login successful"

    return False, "Invalid username or password"
    
def register_user(username, password):

    for user in users:

        if user["username"] == username:
            return False, "Username already exists"

    users.append({
        "username": username,
        "password": password
    })

    return True, "User registered successfully"
from app.models.user import User
from app.database.db import db


class UserRepository:

    @staticmethod
    def get_by_username(username):
        return User.query.filter_by(username=username).first()

    @staticmethod
    def create_user(username, password_hash):
        user = User(
            username=username,
            password=password_hash
        )

        db.session.add(user)
        db.session.commit()

        return user
    
    @staticmethod
    def get_by_id(user_id):
        return User.query.get(user_id)
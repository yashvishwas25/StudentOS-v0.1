import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    DEBUG = os.getenv("DEBUG") == "True"
    APP_NAME = os.getenv("APP_NAME")
    
    SQLALCHEMY_DATABASE_URI = "sqlite:///studentos.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    JWT_SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY"
    )
    
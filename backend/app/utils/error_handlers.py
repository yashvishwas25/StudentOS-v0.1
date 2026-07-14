from app.utils.responses import error_response
from app.utils.exceptions import AppError
from app.utils.constants import HTTP_500_INTERNAL_SERVER_ERROR


def register_error_handlers(app):

    @app.errorhandler(AppError)
    def handle_app_error(error):
        return error_response(
            error.message,
            error.status_code
        )

    @app.errorhandler(Exception)
    def handle_generic_error(error):
        print(error)

        return error_response(
            "Internal Server Error",
            HTTP_500_INTERNAL_SERVER_ERROR
    )
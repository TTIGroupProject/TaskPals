from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager  # Import the JWT Manager
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize the database
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Configure the MySQL connection
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("MYSQL_DATABASE_URI")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")  # Add your JWT secret key

    db.init_app(app)

    # Initialize JWT
    jwt = JWTManager(app)

    # Imports for blueprints
    from routes.customer import customer_bp
    from routes.provider import provider_bp
    from routes.review import review_bp
    from routes.service import service_bp

    # Register Blueprints
    app.register_blueprint(customer_bp, url_prefix='/api/customers')
    app.register_blueprint(provider_bp, url_prefix='/api/providers')
    app.register_blueprint(review_bp, url_prefix='/api/reviews')
    app.register_blueprint(service_bp, url_prefix='/api/services')

    return app

# This section should only be executed when running app.py directly
if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()  # Creates database tables based on the defined models
    app.run(port=5000)
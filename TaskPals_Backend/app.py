from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def create_app():
    app = Flask(__name__)

    # Configure the MySQL connection
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("MYSQL_DATABASE_URI")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Blueprints import
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

from models import db 

# This section should only be executed when running app.py directly, not imported as a module elsewhere
if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(port=5000)
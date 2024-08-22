from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure the MySQL connection
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("MYSQL_DATABASE_URI", "mysql+mysqlconnector://taskpals:DataTask!Pals@127.0.0.1:3306/taskPals")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

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

# Push context manually to create tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(port=5000)
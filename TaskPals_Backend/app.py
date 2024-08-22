from flask import Flask, jsonify
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

# Define the Provider model
class Provider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    profile_image = db.Column(db.String(200))
    bio = db.Column(db.Text)
    specialties = db.Column(db.String(200))  # Store as comma-separated values
    rating = db.Column(db.Float)

# Push context manually to create tables
with app.app_context():
    db.create_all()

@app.route('/api/providers', methods=['GET'])
def get_providers():
    try:
        providers = Provider.query.all()
        return jsonify([{
            'id': p.id,
            'name': p.name,
            'profile_image': p.profile_image,
            'bio': p.bio,
            'specialties': p.specialties.split(','),  # Convert back to a list
            'rating': p.rating
        } for p in providers]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
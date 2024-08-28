from flask_sqlalchemy import SQLAlchemy
import bcrypt
from typing import Any

db = SQLAlchemy()

class Customer(db.Model):
    __tablename__ = 'customers'
    customer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def set_password(self, password: str) -> None:
        if isinstance(password, bytes):
            password = password.decode('utf-8')
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def check_password(self, password: str) -> bool:
        if isinstance(password, bytes):
            password = password.decode('utf-8')
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash)

class Provider(db.Model):
    __tablename__ = 'providers'
    provider_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    profile_image = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    specialties = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class Service(db.Model):
    __tablename__ = 'services'
    service_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    service_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)

class Review(db.Model):
    __tablename__ = 'reviews'
    review_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    provider_id = db.Column(db.Integer, db.ForeignKey('providers.provider_id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class Booking(db.Model):
    __tablename__ = 'bookings'
    booking_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('providers.provider_id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.service_id'), nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
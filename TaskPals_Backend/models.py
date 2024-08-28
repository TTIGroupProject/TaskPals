from flask_sqlalchemy import SQLAlchemy
import bcrypt
from typing import Any, Optional


db = SQLAlchemy()

class Customer(db.Model):
    __tablename__ = 'customers'
    customer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __init__(self, name: str, email: str, phone: Optional[str] = None, password_hash: Optional[str] = None) -> None:
        self.name = name
        self.email = email
        self.phone = phone
        if password_hash is not None:
            self.password_hash = password_hash
        else:
            self.password_hash = ""

    def set_password(self, password: str) -> None:
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password: str) -> bool:
        if self.password_hash:
            return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
        return False

class Provider(db.Model):
    __tablename__ = 'providers'
    provider_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phoneNumber = db.Column(db.String(255), nullable=False)
    jobApplyingFor = db.Column(db.String(255), nullable=False)
    experience = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.Text, nullable=False)
    profilePicture = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

def __init__(self, firstName: str, lastName: str, email: str, phoneNumber: str, jobApplyingFor: str,
experience: int, bio: str, profilePicture: Optional[str] = None) -> None:
    self.firstName = firstName
    self.lastName = lastName
    self.email = email
    self.phoneNumber = phoneNumber
    self.jobApplyingFor = jobApplyingFor
    self.experience = experience
    self.bio = bio
    self.profilePicture = profilePicture

class Service(db.Model):
    __tablename__ = 'services'
    service_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    service_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)

    def __init__(self, service_name: str, description: Optional[str] = None) -> None:
        self.service_name = service_name
        self.description = description

class Review(db.Model):
    __tablename__ = 'reviews'
    review_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    provider_id = db.Column(db.Integer, db.ForeignKey('providers.provider_id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __init__(self, provider_id: int, customer_id: int, rating: float, 
                 comment: Optional[str] = None) -> None:
        self.provider_id = provider_id
        self.customer_id = customer_id
        self.rating = rating
        self.comment = comment

class Booking(db.Model):
    __tablename__ = 'bookings'
    booking_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('providers.provider_id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.service_id'), nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __init__(self, customer_id: int, provider_id: int, service_id: int, 
                 booking_date: Any) -> None:
        self.customer_id = customer_id
        self.provider_id = provider_id
        self.service_id = service_id
        self.booking_date = booking_date
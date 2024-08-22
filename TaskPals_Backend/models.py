from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Provider(db.Model):
    __tablename__ = 'providers'
    provider_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    profile_image = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    specialties = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class Customer(db.Model):
    __tablename__ = 'customers'
    customer_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class Service(db.Model):
    __tablename__ = 'services'
    service_id = db.Column(db.Integer, primary_key=True)
    service_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)

class Review(db.Model):
    __tablename__ = 'reviews'
    review_id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey('providers.provider_id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class Booking(db.Model):
    __tablename__ = 'bookings'
    booking_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('providers.provider_id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.service_id'), nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
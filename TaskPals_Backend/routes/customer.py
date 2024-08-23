from flask import Blueprint, request, jsonify
from models import db, Customer
import bcrypt

customer_bp = Blueprint('customer_bp', __name__)

# Route to Create a New Customer
@customer_bp.route('/', methods=['POST'])
def create_customer():
    data = request.get_json()
    password = data.pop('password')  # Extract password field

    if Customer.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    password = data.pop('password')  # Extract password field

    if Customer.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    new_customer = Customer(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone')
    )
    new_customer.set_password(password)

    new_customer.set_password(password)

    try:
        db.session.add(new_customer)
        db.session.commit()
        return jsonify({"message": "Customer created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    customer = Customer.query.filter_by(email=email).first()

    if customer and customer.check_password(password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

@customer_bp.route('/', methods=['GET'])
def get_customers():
    try:
        customers = Customer.query.all()
        return jsonify([{
            'customer_id': c.customer_id,
            'name': c.name,
            'email': c.email,
            'phone': c.phone,
            'created_at': c.created_at
        } for c in customers]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to Fetch a Single Customer by ID
@customer_bp.route('/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    return jsonify({
        'customer_id': customer.customer_id,
        'name': customer.name,
        'email': customer.email,
        'phone': customer.phone,
        'created_at': customer.created_at
    })

# Route to Update Customer Information
@customer_bp.route('/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    data = request.get_json()
    customer.name = data.get('name', customer.name)
    customer.email = data.get('email', customer.email)
    customer.phone = data.get('phone', customer.phone)
    try:
        db.session.commit()
        return jsonify({"message": "Customer updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to Delete a Customer by ID
@customer_bp.route('/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    try:
        db.session.delete(customer)
        db.session.commit()
        return jsonify({"message": "Customer deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    

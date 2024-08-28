from flask import Blueprint, request, jsonify
from models import db, Customer, Booking, Review, Provider, Service
import bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
from werkzeug.utils import secure_filename

customer_bp = Blueprint('customer_bp', __name__)
provider_bp = Blueprint('provider_bp', __name__)
review_bp = Blueprint('review_bp', __name__)
service_bp = Blueprint('service_bp', __name__)
booking_bp = Blueprint('booking_bp', __name__)

UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Route to Create a New Customer
@customer_bp.route('/', methods=['POST'])
def create_customer():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request payload is empty"}), 400

    password = data.pop('password', None)

    if not password:
        return jsonify({"error": "Password is required"}), 400

    if not data.get('email') or not data.get('name'):
        return jsonify({"error": "Email and Name are required"}), 400

    if Customer.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    new_customer = Customer(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone')
    )
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

    if not data:
        return jsonify({"error": "Request payload is empty"}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and Password are required"}), 400

    customer = Customer.query.filter_by(email=email).first()

    if customer and customer.check_password(password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

# Route to Fetch All Customers
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

    if not data:
        return jsonify({"error": "Request payload is empty"}), 400

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

# Route to Fetch a Customer's Profile (requires JWT)
@customer_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_customer_profile():
    current_user_id = get_jwt_identity()  # Fetches the currently logged-in user's ID
    customer = Customer.query.get(current_user_id)

    if not customer:
        return jsonify({"message": "Customer not found"}), 404

    # Return essential customer details
    return jsonify({
        "name": customer.name,
        "email": customer.email,
        "phone": customer.phone,
    }), 200

# Route to Update Customer Profile
@customer_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_customer_profile():
    current_user_id = get_jwt_identity()
    customer = Customer.query.get(current_user_id)

    if not customer:
        return jsonify({"message": "Customer not found"}), 404

    data = request.json

    if not data:
        return jsonify({"error": "Request payload is empty"}), 400

    customer.name = data.get('name', customer.name)
    customer.email = data.get('email', customer.email)
    customer.phone = data.get('phone', customer.phone)

    db.session.commit()
    return jsonify({"message": "Profile updated successfully"}), 200

# Route to Fetch Past Orders
@customer_bp.route('/orders', methods=['GET'])
@jwt_required()
def get_customer_orders():
    current_user_id = get_jwt_identity()
    orders = Booking.query.filter_by(customer_id=current_user_id).all()

    order_list = [{
        "id": order.booking_id,
        "service_name": order.service_id,  
        "booking_date": order.booking_date,
        "status": "Pending", 
    } for order in orders]

    return jsonify(order_list), 200

# Route to Create a New Provider
@provider_bp.route('/', methods=['POST'])
def create_provider():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request payload is empty"}), 400

    new_provider = Provider(
        name=data.get('name'),
        email=data.get('email'),
        profile_image=data.get('profile_image'),
        bio=data.get('bio'),
        specialties=data.get('specialties'),
        rating=data.get('rating')
    )

    try:
        db.session.add(new_provider)
        db.session.commit()
        return jsonify({"message": "Provider created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to Fetch All Providers
@provider_bp.route('/', methods=['GET'])
def get_providers():
    try:
        providers = Provider.query.all()
        return jsonify([{
            'provider_id': p.provider_id,
            'name': p.name,
            'email': p.email,
            'profile_image': p.profile_image,
            'bio': p.bio,
            'specialties': p.specialties,
            'rating': p.rating,
            'created_at': p.created_at
        } for p in providers]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to Fetch a Single Provider by ID
@provider_bp.route('/<int:provider_id>', methods=['GET'])
def get_provider(provider_id):
    provider = Provider.query.get_or_404(provider_id)
    return jsonify({
        'provider_id': provider.provider_id,
        'name': provider.name,
        'email': provider.email,
        'profile_image': provider.profile_image,
        'bio': provider.bio,
        'specialties': provider.specialties,
        'rating': provider.rating,
        'created_at': provider.created_at
    }), 200

# Route to Update Provider Information
@provider_bp.route('/<int:provider_id>', methods=['PUT'])
def update_provider(provider_id):
    provider = Provider.query.get_or_404(provider_id)

    # Handle file upload
    profile_image_file = request.files.get('profile_image')
    if profile_image_file and allowed_file(profile_image_file.filename):
        filename = profile_image_file.filename  # Storing it temporarily
        if filename:  # Check that filename is not None or empty
            filename = secure_filename(filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            profile_image_file.save(file_path)
            provider.profile_image = filename

    # Handle JSON data
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request payload is empty"}), 400

    provider.name = data.get('name', provider.name)
    provider.email = data.get('email', provider.email)
    provider.bio = data.get('bio', provider.bio)
    provider.specialties = data.get('specialties', provider.specialties)
    provider.rating = data.get('rating', provider.rating)

    try:
        db.session.commit()
        return jsonify({"message": "Provider updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to Delete a Provider by ID
@provider_bp.route('/<int:provider_id>', methods=['DELETE'])
def delete_provider(provider_id):
    provider = Provider.query.get_or_404(provider_id)
    try:
        db.session.delete(provider)
        db.session.commit()
        return jsonify({"message": "Provider deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to Create a New Review
@review_bp.route('/', methods=['POST'])
def create_review():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request payload is empty"}), 400

    new_review = Review(
        provider_id=data['provider_id'],
        customer_id=data['customer_id'],
        rating=data['rating'],
        comment=data.get('comment')
    )
    try:
        db.session.add(new_review)
        db.session.commit()
        return jsonify({"message": "Review created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@review_bp.route('/', methods=['GET'])
def get_reviews():
    try:
        reviews = Review.query.all()
        return jsonify([{
            'review_id': r.review_id,
            'provider_id': r.provider_id,
            'customer_id': r.customer_id,
            'rating': r.rating,
            'comment': r.comment,
            'created_at': r.created_at
        } for r in reviews]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@review_bp.route('/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.query.get_or_404(review_id)
    return jsonify({
        'review_id': review.review_id,
        'provider_id': review.provider_id,
        'customer_id': review.customer_id,
        'rating': review.rating,
        'comment': review.comment,
        'created_at': review.created_at
    })

@review_bp.route('/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    review = Review.query.get_or_404(review_id)
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request payload is empty"}), 400

    review.rating = data.get('rating', review.rating)
    review.comment = data.get('comment', review.comment)
    try:
        db.session.commit()
        return jsonify({"message": "Review updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@review_bp.route('/<int:review_id>', methods=['DELETE'])
def delete_review(review_id): 
    review = Review.query.get_or_404(review_id)
    try:
        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Review deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to Create a New Service
@service_bp.route('/', methods=['POST'])
def create_service():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request payload is empty"}), 400

    new_service = Service(
        service_name=data['service_name'],
        description=data.get('description')
    )
    try:
        db.session.add(new_service)
        db.session.commit()
        return jsonify({"message": "Service created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@service_bp.route('/', methods=['GET'])
def get_services():
    try:
        services = Service.query.all()
        return jsonify([{
            'service_id': s.service_id,
            'service_name': s.service_name,
            'description': s.description
        } for s in services]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@service_bp.route('/<int:service_id>', methods=['GET'])
def get_service(service_id):
    service = Service.query.get_or_404(service_id)
    return jsonify({
        'service_id': service.service_id,
        'service_name': service.service_name,
        'description': service.description
    })

@service_bp.route('/<int:service_id>', methods=['PUT'])
def update_service(service_id):
    service = Service.query.get_or_404(service_id)
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request payload is empty"}), 400

    service.service_name = data.get('service_name', service.service_name)
    service.description = data.get('description', service.description)
    try:
        db.session.commit()
        return jsonify({"message": "Service updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@service_bp.route('/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):
    service = Service.query.get_or_404(service_id)
    try:
        db.session.delete(service)
        db.session.commit()
        return jsonify({"message": "Service deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
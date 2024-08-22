from flask import Blueprint, request, jsonify
from app import db
from models import Provider

provider_bp = Blueprint('provider_bp', __name__)

@provider_bp.route('/', methods=['POST'])
def create_provider():
    data = request.get_json()
    new_provider = Provider(
        name=data['name'],
        email=data['email'],
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
    })

@provider_bp.route('/<int:provider_id>', methods=['PUT'])
def update_provider(provider_id):
    provider = Provider.query.get_or_404(provider_id)
    data = request.get_json()
    provider.name = data.get('name', provider.name)
    provider.email = data.get('email', provider.email)
    provider.profile_image = data.get('profile_image', provider.profile_image)
    provider.bio = data.get('bio', provider.bio)
    provider.specialties = data.get('specialties', provider.specialties)
    provider.rating = data.get('rating', provider.rating)
    try:
        db.session.commit()
        return jsonify({"message": "Provider updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@provider_bp.route('/<int:provider_id>', methods=['DELETE'])
def delete_provider(provider_id):
    provider = Provider.query.get_or_404(provider_id)
    try:
        db.session.delete(provider)
        db.session.commit()
        return jsonify({"message": "Provider deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
from flask import Blueprint, request, jsonify
from app import db
from models import Service

service_bp = Blueprint('service_bp', __name__)

@service_bp.route('/', methods=['POST'])
def create_service():
    data = request.get_json()
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
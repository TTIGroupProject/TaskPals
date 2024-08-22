from flask import Blueprint, request, jsonify
from app import db
from models import Review

review_bp = Blueprint('review_bp', __name__)

@review_bp.route('/', methods=['POST'])
def create_review():
    data = request.get_json()
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
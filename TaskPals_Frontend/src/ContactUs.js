import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Font Awesome Icons
import './button.css'; // Assuming you have custom styles in this file

const ContactUs = () => {
  return (
    <Container className="my-5">
      {/* Heading */}
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4 text-rose">Contact Us</h1>
          <p className="lead">
            We’re here to help! Whether you have a question or need assistance, feel free to reach out.
          </p>
        </Col>
      </Row>

      {/* Contact Information */}
      <Row className="mb-4">
        <Col md={6}>
          <h2 className="text-rose"><FaEnvelope /> Email Us:</h2>
          <ul className="list-unstyled">
            <li><strong>General Inquiries:</strong> <a href="mailto:contact@taskpals.com" className="text-rose">contact@taskpals.com</a></li>
            <li><strong>Support:</strong> <a href="mailto:support@taskpals.com" className="text-rose">support@taskpals.com</a></li>
          </ul>
        </Col>
        <Col md={6}>
          <h2 className="text-rose"><FaPhone /> Call Us:</h2>
          <p><strong>Customer Service:</strong> <a href="tel:18008275123" className="text-rose">1-800-TASK-123 (1-800-827-5123)</a></p>
        </Col>
      </Row>

      {/* Social Media Links */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-rose"><FaFacebookF /> Follow Us:</h2>
          <p>
            <a href="#" className="text-rose me-3"><FaFacebookF /> Facebook</a> |
            <a href="#" className="text-rose mx-3"><FaTwitter /> Twitter</a> |
            <a href="#" className="text-rose ms-3"><FaInstagram /> Instagram</a>
          </p>
        </Col>
      </Row>

      {/* Address */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-rose">📍 Visit Us:</h2>
          <p>123 Chore Lane, Clean City, CA 12345</p>
        </Col>
      </Row>

      {/* Contact Form */}
      <Row>
        <Col>
          <h2 className="text-rose">Contact Form</h2>
          <Form className="bg-light p-4 rounded border">
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone (Optional):</Form.Label>
              <Form.Control type="text" placeholder="Enter your phone number" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject:</Form.Label>
              <Form.Control type="text" placeholder="Enter the subject" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message:</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Enter your message" />
            </Form.Group>

            <Button
              variant="rose"
              style={{
                backgroundColor: 'rgb(220, 73, 92)', // Slightly darker shade of pink
                borderColor: 'rgb(220, 73, 92)', // Slightly darker shade of pink
                color: 'white',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgb(200, 60, 85)';
                e.target.style.borderColor = 'rgb(200, 60, 85)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgb(220, 73, 92)';
                e.target.style.borderColor = 'rgb(220, 73, 92)';
              }}
            >
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>

      {/* FAQ */}
      <Row className="mt-4">
        <Col>
          <h2 className="text-rose">FAQ</h2>
          <div>
            <p><strong>Q: How quickly can I expect a response?</strong></p>
            <p>A: We aim to respond to all inquiries within 24 hours.</p>
            <p><strong>Q: What if I need urgent help?</strong></p>
            <p>A: For urgent requests, please call our customer service number for immediate assistance.</p>
          </div>
        </Col>
      </Row>

      {/* Footer */}
      <Row className="text-center mt-4">
        <Col>
          <p className="text-muted">Thank you for being a part of the TaskPals community. We’re here to make your experience smooth and enjoyable!</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;

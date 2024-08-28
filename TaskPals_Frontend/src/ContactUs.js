import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './button.css'; // Assuming you have custom styles in this file

const ContactUs = () => {
  return (
    <Container className="my-5">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4 text-pink">🌟 We’re Here to Help! 🌟</h1>
          <p className="lead">
            Got a question or need some assistance? We’d love to hear from you! Whether you’re looking to connect with a helper or have a suggestion to make TaskPals even better, just drop us a line.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <h2 className="text-pink">📧 Email Us:</h2>
          <ul className="list-unstyled">
            <li><strong>General Inquiries:</strong> <a href="mailto:hello@taskpals.com" className="text-pink">contact@taskpals.com</a></li>
            <li><strong>Support:</strong> <a href="mailto:support@taskpals.com" className="text-pink">support@taskpals.com</a></li>
          </ul>
        </Col>
        <Col md={6}>
          <h2 className="text-pink">📞 Call Us:</h2>
          <p><strong>Customer Service:</strong> <a href="tel:18008275123" className="text-pink">1-800-TASK-123 (1-800-827-5123)</a></p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2 className="text-pink">🌐 Follow Us:</h2>
          <p>
            <a href="#" className="text-pink me-2">Facebook</a> |
            <a href="#" className="text-pink mx-2">Twitter</a> |
            <a href="#" className="text-pink ms-2">Instagram</a>
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2 className="text-pink">📍 Visit Us:</h2>
          <p>123 Chore Lane, Clean City, CA 12345</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="text-pink">✉️ Contact Form</h2>
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

            <Button variant="pink"          
              style={{
                backgroundColor: 'rgb(245, 91, 116)',
                borderColor: 'rgb(245, 91, 116)',
                color: 'white',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgb(225, 71, 96)';
                e.target.style.borderColor = 'rgb(225, 71, 96)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgb(245, 91, 116)';
                e.target.style.borderColor = 'rgb(245, 91, 116)';
              }}>Send Message</Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2 className="text-pink">FAQ:</h2>
          <div>
            <p><strong>Q: How quickly can I expect a response?</strong></p>
            <p>A: We aim to respond to all inquiries within 24 hours.</p>
            <p><strong>Q: What if I need urgent help?</strong></p>
            <p>A: For urgent requests, please call our customer service number for immediate assistance.</p>
          </div>
        </Col>
      </Row>

      <Row className="text-center mt-4">
        <Col>
          <p className="text-muted">We’re always here to make your household chores a breeze! Thanks for being a part of the TaskPals community. 💖</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;

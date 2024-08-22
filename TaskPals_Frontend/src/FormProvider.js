import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        jobApplyingFor: '',
        experience: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, jobApplyingFor, experience } = formData;
        if (!firstName || !lastName || !email || !jobApplyingFor || !experience) {
            alert('All fields are required!');
            return;
        }

        console.log('Signup data:', formData);

        setSubmitted(true);
    };

    if (submitted) {
        return (
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card>
                            <Card.Body className="text-center">
                                <h2>Thank you for signing up with TaskPals! We will send you an email shortly with the jobs availible.</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h1 className="card-title text-center mb-4">Signup for TaskPals</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="firstName" className="mb-3">
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="lastName" className="mb-3">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="jobApplyingFor" className="mb-3">
                                    <Form.Label>Job Applying For:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="jobApplyingFor"
                                        value={formData.jobApplyingFor}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a job</option>
                                        <option value="plumber">Plumber</option>
                                        <option value="electrician">Electrician</option>
                                        <option value="cleaningHelp">Cleaning Help</option>
                                        <option value="gardener">Gardener</option>
                                        <option value="handyman">Handyman</option>
                                        <option value="exterminator">Exterminator</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="experience" className="mb-3">
                                    <Form.Label>Experience (in years):</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" variant="primary" className="w-100">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SignupForm;

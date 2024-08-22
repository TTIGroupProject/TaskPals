import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AboutUs = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">About TaskPals</Card.Title>
                            <Card.Text>
                                Welcome to TaskPals, your go-to platform for finding reliable home services and job opportunities in your area. At TaskPals, we understand the need for trustworthy and efficient help for your home needs, whether it's fixing a leaky faucet, electrical work, cleaning, gardening, or any other home service.

                                We connect you with local professionals who can assist you with various tasks. Our service providers are vetted for quality and reliability, ensuring that you receive top-notch assistance for your home needs.

                                Additionally, TaskPals offers job opportunities for skilled professionals seeking to join our network. If you are a handyman, electrician, plumber, or any other service provider, you can apply to become part of our trusted team. We are always looking for talented individuals who are passionate about providing excellent service.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Find Services or Apply for a Job</Card.Title>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Card className="text-center">
                                        <Card.Body>
                                            <Card.Title>Looking for Home Services?</Card.Title>
                                            <Card.Text>
                                                Explore our range of services and connect with trusted professionals to get the help you need at home.
                                            </Card.Text>
                                            <Button href="/services" variant="primary">Find Services</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Card className="text-center">
                                        <Card.Body>
                                            <Card.Title>Apply for a Job</Card.Title>
                                            <Card.Text>
                                                Join our team of professionals and start offering your services to clients in need. Apply now to become a part of TaskPals.
                                            </Card.Text>
                                            <Button href="/apply" variant="primary">Apply Now</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="text-center mt-4" style={{ backgroundColor: '#f8f9fa' }}>
                        <Card.Body>
                            <Card.Title>Contact Us</Card.Title>
                            <Card.Text>
                                <p>Phone: (123) 456-7890</p>
                                <p>Email: contact@taskpals.com</p>
                                <p>Hours: Mon-Fri 9:00 AM - 5:00 PM</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutUs;

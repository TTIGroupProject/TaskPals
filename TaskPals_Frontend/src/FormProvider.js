import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import WebcamCapture from './WebcamCapture.js';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    jobApplyingFor: '',
    experience: '',
    bio: '',
    profilePicture: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [cameraOption, setCameraOption] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file
      });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePictureUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phoneNumber, jobApplyingFor, experience, bio } = formData;
    if (!firstName || !lastName || !email || !phoneNumber || !jobApplyingFor || !experience || !bio) {
      alert('All fields are required!');
      return;
    }

    console.log('Signup data:', formData);

    setSubmitted(true);
  };

  const handleCameraOptionChange = (e) => {
    const option = e.target.value;
    setCameraOption(option);
    if (option === 'take') {
      setShowCamera(true);
    } else if (option === 'select') {
      document.getElementById('profilePictureInput').click();
    }
  };

  const handlePhotoCapture = (imageSrc) => {
    setProfilePictureUrl(imageSrc);
    setFormData({
      ...formData,
      profilePicture: imageSrc
    });
    setShowCamera(false);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePictureUrl(reader.result);
        setFormData({
          ...formData,
          profilePicture: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (submitted) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Body className="text-center">
                <h2>Thank you for signing up with TaskPals! We will send you an email shortly with the jobs available.</h2>
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
                <Form.Group controlId="phoneNumber" className="mb-3">
                  <Form.Label>Phone Number:</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
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
                    <option value="interiorcleaner">Interior Cleaner</option>
                    <option value="exteriorcleaner">Exterior Cleaner</option>
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
                <Form.Group controlId="bio" className="mb-3">
                  <Form.Label>Bio:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="profilePicture" className="mb-3">
                  <Form.Label>Profile Picture:</Form.Label>
                  <Form.Control
                    as="select"
                    name="cameraOption"
                    value={cameraOption}
                    onChange={handleCameraOptionChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="take">Take Photo</option>
                    <option value="select">Select from Library</option>
                  </Form.Control>
                  <input
                    id="profilePictureInput"
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </Form.Group>
                {profilePictureUrl && (
                  <img src={profilePictureUrl} alt="Profile Preview" style={{ width: '100%', marginTop: '10px' }} />
                )}
                <Button type="submit" variant="primary">Apply</Button>
              </Form>
              {showCamera && (
                <WebcamCapture
                  onCapture={handlePhotoCapture}
                  onClose={handleCloseCamera}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;

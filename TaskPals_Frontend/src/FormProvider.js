import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Dropdown } from 'react-bootstrap';
import WebcamCapture from './WebcamCapture.js';
import axios from 'axios';
import cleaning from './images/cleaning.jpg';
import landscaping from './images/gardener.jpg';
import plumbing from './images/plumbing.png';
import exterminator from './images/exterminator.jpg';
import handyman from './images/drill.jpg';
import moving from './images/moving.jpg';
import electricalWork from './images/electrician.jpg';
import painting from './images/paint.jpg';
import './FormProvider.css';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phoneNumber, jobApplyingFor, experience, bio, profilePicture } = formData;
    if (!firstName || !lastName || !email || !phoneNumber || !jobApplyingFor || !experience || !bio) {
      alert('All fields are required!');
      return;
    }

    const form = new FormData();
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('email', email);
    form.append('phoneNumber', phoneNumber);
    form.append('jobApplyingFor', jobApplyingFor);
    form.append('experience', experience);
    form.append('bio', bio);
    if (profilePicture) {
      form.append('profilePicture', profilePicture);
    }

    try {
      await axios.post('http://localhost:5000/api/providers', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
    <Container className="mt-5 pb-5">
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
                  <Dropdown className="custom-dropdown" onSelect={(e) => setFormData({ ...formData, jobApplyingFor: e })}>
                    <Dropdown.Toggle id="dropdown-basic">
                      {formData.jobApplyingFor || 'Select a job'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Cleaning">Cleaning<img src={cleaning} alt="cleaning supplies" className="dropdown-item-img" /></Dropdown.Item>
                      <Dropdown.Item eventKey="Landscaping">Landscaping<img src={landscaping} alt="garden tools" className="dropdown-item-img" /></Dropdown.Item>
                      <Dropdown.Item eventKey="Plumbing">Plumbing<img src={plumbing} alt="plumbing supplies" className="dropdown-item-img" /></Dropdown.Item>
                      <Dropdown.Item eventKey="Exterminator">Exterminator<img src={exterminator} alt="bug" className="dropdown-item-img" /></Dropdown.Item>
                      <Dropdown.Item eventKey="Handy Man">Handy Man<img src={handyman} alt="drill" className="dropdown-item-img" /></Dropdown.Item>
                      <Dropdown.Item eventKey="Moving">Moving<img src={moving} alt="moving truck" className="dropdown-item-img" /></Dropdown.Item>
                      <Dropdown.Item eventKey="Electrical Work">Electrical Work<img src={electricalWork} alt="electrical supplies" className="dropdown-item-img" /></Dropdown.Item>
                      <Dropdown.Item eventKey="Painting">Painting<img src={painting} alt="paint supplies" className="dropdown-item-img" /></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
                <Button
                  variant="custom"
                  type="submit"
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
                  }}
                >
                  Apply
                </Button>
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


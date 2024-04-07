import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/navBar';
import Form from 'react-bootstrap/Form';
import { addLocation } from '../redux/locations/locationAction';

export default function AddLocation() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [locationData, setLocationData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setLocationData({ ...locationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for name field
  if (!locationData.name.trim()) {
    setError("Name cannot be empty");
    return;
  }

  // Validation for address field
  const addressRegex = /^[0-9a-zA-Z/,\s]*$/;
  if (!locationData.address.trim()) {
    setError("Address cannot be empty");
    return;
  } else if (!addressRegex.test(locationData.address)) {
    setError("Address can only contain numbers, '/' ',' and letters");
    return;
  }

  // Validation for phone field
  const phoneRegex = /^\d{10}$/;
  if (!locationData.phone.trim()) {
    setError("Phone number cannot be empty");
    return;
  } else if (!phoneRegex.test(locationData.phone)) {
    setError("Phone number must contain 10 digits and only numbers");
    return;
  }



    dispatch(addLocation(locationData));
  };

  return (
    <div>
      <Navbar />
      <div className="container header">
        <h1>Add New Location</h1>
      </div>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter location name"
              value={locationData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter location address"
              value={locationData.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={locationData.phone}
              onChange={handleInputChange}
            />
            {error && <p className="text-danger">{error}</p>}
            </Form.Group>
          <div className="btn-container">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

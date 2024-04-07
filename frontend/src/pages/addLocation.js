import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
          </Form.Group>
          <div className="btn-container">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            {error && <p className="text-danger">{error}</p>}
          </div>
        </Form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import NavBar from "../components/navBar";
import Form from "react-bootstrap/Form";
import "./styles/addDevice.css";
import { useDispatch } from "react-redux";
import { addDevice } from "../redux/devices/deviceActions";
import { useLocation } from "react-router-dom";

export default function AddDevice() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentLocation = new URLSearchParams(location.search).get('location');
  const [formData, setFormData] = useState({
    serialNumber: "",
    image: null,
    type: "",
    status: "",
    name: currentLocation
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("serialNumber", formData.serialNumber);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("name", formData.name);

      const { success, message } = await dispatch(addDevice(formDataToSend));

      if (success) {
        console.log("Device added:", message);
        setFormData({
          serialNumber: "",
          image: null,
          type: "",
          status: "",
          name: currentLocation
        });
      } else {
        console.error("Failed to add device:", message);
        setError(message);
      }
    } catch (error) {
      console.error("Failed to add device:", error);
      setError("An error occurred while adding the device.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container header">
        <h1>Add New Device</h1>
      </div>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="serialNumber">
            <Form.Label>Serial Number</Form.Label>
            <Form.Control
              type="text"
              name="serialNumber"
              placeholder="Enter the serial number"
              value={formData.serialNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Device Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="POS">POS</option>
              <option value="KIOSK">KIOSK</option>
              <option value="Signage">Signage</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Device Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Control>
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

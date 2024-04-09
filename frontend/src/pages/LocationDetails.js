import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NavBar from '../components/navBar';
import Device from '../components/device';
import '../pages/styles/addLocation.css';
import { Link } from 'react-router-dom';
import { getDevices } from '../redux/devices/deviceActions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/loading';
import { deleteLocation, updateLocation } from '../redux/locations/locationAction';
import { Modal, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

function LocationDetails() {
  const { name } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [locationData, setLocationData] = useState({});
  const address = new URLSearchParams(location.search).get('address');
  const phone = new URLSearchParams(location.search).get('phone');
  const devicesJson = new URLSearchParams(location.search).get('devices');
  const id = useSelector(state => state.deviceReducer.data._id);
  const loading = useSelector(state => state.deviceReducer.loading);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newLocationData, setNewLocationData] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const locationError = useSelector(state => state.locationReducer.error);

  console.log("Devices JSON", devicesJson);
  let devices = [];
  try {
    devices = JSON.parse(devicesJson);
  } catch (error) {
    console.error("Error parsing", error);
  }

  useEffect(() => {
    dispatch(getDevices());
  }, [dispatch]);

  useEffect(() => {
    setLocationData({
      name: name,
      address: address,
      phone: phone
    });
  }, [name, address, phone]);

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleInputChange = (e) => {
    setNewLocationData({ ...newLocationData, [e.target.name]: e.target.value });
  };

  const handleUpdateLocation = () => {
    // Clear previous errors
    setError("");

    // Validation for name field
    let nameValue = newLocationData.name || locationData.name;
if (!nameValue.trim()) {
  setError("Name cannot be empty");
  return;
}

    // Validation for address field
    const addressRegex = /^[0-9a-zA-Z/,\s]*$/;
    let addressValue = newLocationData.address || locationData.address;
    if (!addressValue.trim()) {
      setError("Address cannot be empty");
      return;
    } else if (!addressRegex.test(addressValue)) {
      setError("Address can only contain numbers, '/', ',' and letters");
      return;
    }

    // Validation for phone field
    const phoneRegex = /^\d{10}$/;
    if (!newLocationData.phone.trim()) {
      setError("Phone number cannot be empty");
      return;
    } else if (!phoneRegex.test(newLocationData.phone)) {
      setError("Phone number must contain 10 digits and only numbers");
      return;
    }

    // Dispatch the updateLocation action
    dispatch(updateLocation(name, newLocationData));
    handleCloseUpdateModal();
  };

  const handleDeleteLocation = () => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      dispatch(deleteLocation(name));
    }
  };

  return (
    <div>
      <NavBar/>
      <div className="container header">
        <h1>Location Details</h1>
        <div className='btn-container'>
          <DropdownButton id="dropdown-basic-button" title="Manage Location">
            <Dropdown.Item onClick={handleOpenUpdateModal}>Update Location</Dropdown.Item>
            <Dropdown.Item onClick={handleDeleteLocation}>Delete Location</Dropdown.Item>
          </DropdownButton>
          <Link to={`/devices?location=${name}`} className="btn btn-primary">Add New Device</Link>
        </div>
      </div>
      <div className="container">
        <p><h2>{name}</h2></p>
        <p><b>Address:</b> {address}</p>
        <p><b>Phone:</b> {phone}</p>
        <p><b>Devices:</b>
          <div className='device-con'>
            {loading ? (
              <Loading />
            ) : (
              <div className='device-con'>
                {devices.length > 0 ? (
                  devices.map(device => (
                    <Device
                      key={device._id}
                      serialNumber={device.serialNumber}
                      type={device.type}
                      image={device.image}
                      status={device.status}
                    />
                  ))
                ) : (
                  <p>No devices</p>
                )}
              </div>
            )}
          </div>
        </p>
      </div>
      <Modal show={isUpdateModalOpen} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLocationName">
              <Form.Label>Location Name</Form.Label>
              <Form.Control type="text" name="name" value={newLocationData.name || locationData.name} onChange={handleInputChange} />
              {error && newLocationData.name && newLocationData.name !== locationData.name && (
                <p className="text-danger">{error}</p>
              )}
            </Form.Group>
            <Form.Group controlId="formLocationAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={newLocationData.address || locationData.address} onChange={handleInputChange} />
              {error && newLocationData.address && newLocationData.address !== locationData.address && (
                <p className="text-danger">{error}</p>
              )}
            </Form.Group>
            <Form.Group controlId="formLocationPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={newLocationData.phone || locationData.phone} onChange={handleInputChange} />
              {error && newLocationData.phone && newLocationData.phone !== locationData.phone && (
                <p className="text-danger">{error}</p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateLocation}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LocationDetails;

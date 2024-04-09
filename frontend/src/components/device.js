import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import './styles/device.css';
import { deleteDevice, updateDeviceStatus } from '../redux/devices/deviceActions';

function Device({ serialNumber, type, image, status }) {
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);

  const handleRemoveDevice = () => {
    const confirmDelete = window.confirm("Are you sure you want to remove this device?");
    if (confirmDelete) {
      dispatch(deleteDevice(serialNumber));
    }
  };

  const handleUpdateDevice = () => {
    dispatch(updateDeviceStatus(serialNumber, newStatus));
    handleCloseUpdateModal();
  };

  return (
    <Card className='device-card'>
      <Card.Subtitle className="mb-2 text-muted">Serial Number</Card.Subtitle>
      <Card.Title>{serialNumber}</Card.Title>
      <Card.Img className='image-container' variant="top" src={image} alt="Image not available" />
      <Card.Body>
        <Card.Text>
          <span>
            <b>Type:</b> {type}
          </span>
          <span className={`status ${status}`}>
            <b className='st'>Status:</b>{status}
          </span>
        </Card.Text>
        <div className='btn-container'>
          <Button className='btn btn-primary btn-green' onClick={handleShowUpdateModal}>Update</Button>
          <Button className='btn btn-primary btn-red' onClick={handleRemoveDevice}>Remove</Button>
        </div>
      </Card.Body>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Device Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="newStatus">
            <Form.Label>New Status</Form.Label>
            <Form.Control 
              as="select" 
              value={newStatus} 
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-primary" onClick={handleUpdateDevice}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default Device;

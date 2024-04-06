import React from 'react';
import Card from 'react-bootstrap/Card';
import './styles/device.css';
import { useDispatch } from 'react-redux';
import { deleteDevice } from '../redux/devices/deviceActions';

function Device({ serialNumber, type, image, status, imageUrl }) {
  const dispatch = useDispatch();
  const handleRemoveDevice = () => {
    const confirmDelete = window.confirm("Are you sure you want to remove this device?");
    if (confirmDelete) {
      dispatch(deleteDevice(serialNumber));
    }
  };

  return (
    <Card className='device-card'>
      <Card.Subtitle className="mb-2 text-muted">Serial Number</Card.Subtitle>
      <Card.Title>{serialNumber}</Card.Title>
      <Card.Img
        className='image-container'
        variant="top"
        src={imageUrl}
        alt="Image not available"
      />
      <Card.Body>
        <Card.Text>
          <span>
            <b>Type:</b> {type}
          </span>
          <span className={`status ${status}`}>
            <b className='st'>Status:</b>{status}
          </span>
          <div className='btn-container'>
            <button className='btn btn-primary' onClick={handleRemoveDevice}>Remove</button>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Device;

import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NavBar from '../components/navBar';
import Device from '../components/device';
import '../pages/styles/addLocation.css';
import { Link } from 'react-router-dom';

function LocationDetails() {
  const { name } = useParams();
  const location = useLocation();
  const address = new URLSearchParams(location.search).get('address');
  const phone = new URLSearchParams(location.search).get('phone');
  const devicesJson = new URLSearchParams(location.search).get('devices');
  console.log("Devices JSON", devicesJson);
  let devices = [];
  try {
    devices = JSON.parse(devicesJson);
  } catch (error) {
    console.error("Error parsing",error);
  }

  return (
    <div><NavBar/>
    <div className="container header">
      <h1>Location Details</h1>
      <Link to={`/devices?location=${name}`} className="btn btn-primary">Add New Device</Link>
      </div>
      <div className="container">
      <p><h2>{name}</h2></p>
      <p><b>Address:</b> {address}</p>
      <p><b>Phone:</b> {phone}</p>
      <p><b>Devices:</b> 
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
      </p>
     </div>
    </div>
  );
}

export default LocationDetails;

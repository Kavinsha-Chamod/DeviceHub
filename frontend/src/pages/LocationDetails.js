import React,{useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NavBar from '../components/navBar';
import Device from '../components/device';
import '../pages/styles/addLocation.css';
import { Link } from 'react-router-dom';
import { getDevices } from '../redux/devices/deviceActions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/loading';

function LocationDetails() {
  const { name } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const address = new URLSearchParams(location.search).get('address');
  const phone = new URLSearchParams(location.search).get('phone');
  const devicesJson = new URLSearchParams(location.search).get('devices');
  const loading = useSelector(state => state.deviceReducer.loading);
  console.log("Devices JSON", devicesJson);
  let devices = [];
  try {
    devices = JSON.parse(devicesJson);
  } catch (error) {
    console.error("Error parsing",error);
  }

  useEffect(() => {
    // Dispatch action to fetch devices
    dispatch(getDevices());
  }, [dispatch]);

  return (
    <div><NavBar/>
    <div className="container header">
      <h1>Location Details</h1><div className='btn-container'>
      <Link to={`/devices?location=${name}`} className="btn btn-primary">Add New Device</Link>
      </div></div>
      <div className="container">
      <p><h2>{name}</h2></p>
      <p><b>Address:</b> {address}</p>
      <p><b>Phone:</b> {phone}</p>
      <p><b>Devices:</b> 
      <div className='device-con'>
      {loading ? ( // Display loading component while loading
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
    </div>
  );
}

export default LocationDetails;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../redux/locations/locationAction";
import LocationCard from "../components/location";
import Loading from "../components/loading";
import NavBar from "../components/navBar";
import './styles/homePage.css';

function LocationList() {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.locationReducer.data);
  const loading = useSelector(state => state.locationReducer.loading);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div className="container header">
        <h1>Locations</h1>
      </div>
      {loading ? (
        <Loading />
      ) : (
        locations.map(location => (
          <LocationCard
            key={location._id}
            _id={location._id}
            name={location.name}
            address={location.address}
            phone={location.phone}
            devices={location.devices} 
          />
        ))
      )}
    </div>
  );
}

export default LocationList;

import React, { useEffect, useState } from "react";
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
  const [viewMode, setViewMode] = useState("list");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setSearchLocation(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <div className="container header">
        <h1>Locations</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by location name"
            value={searchLocation}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="view-mode-controls">
          <span >View Mode :&nbsp;&nbsp;</span>
          <button className={viewMode === "list" ? "active" : ""} onClick={() => toggleViewMode("list")}>List</button>
          <button className={viewMode === "grid" ? "active" : ""} onClick={() => toggleViewMode("grid")}>Grid</button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : filteredLocations.length === 0 ? (
        <div className="container no-locations-message">
          No locations found.
        </div>
      ) : (
        <div className={viewMode === "list" ? "location-list" : "location-grid" }>
          {filteredLocations.map(location => (
            <LocationCard
              key={location._id}
              _id={location._id}
              name={location.name}
              address={location.address}
              phone={location.phone}
              devices={location.devices} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationList;

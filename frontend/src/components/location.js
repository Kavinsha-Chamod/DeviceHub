import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./styles/location.css";
import { Link } from "react-router-dom";

function LocationCard({ _id, name, address, phone, devices }) {
  console.log("devices", devices);
  return (
    <div className="container">
      <Link
        to={{
          pathname: `/locations/${encodeURIComponent(name)}`,
          search: `?address=${encodeURIComponent(address)}&phone=${encodeURIComponent(phone)}&devices=${encodeURIComponent(JSON.stringify(devices))}`,
          state: { name, address, phone, devices }
        }}
        className="location-link"
      >
        <Card className="location-card">
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <span>
                <b>Address:</b> {address}
              </span>
              <span>
                <b>Phone:</b> {phone}
              </span>
              <span>
                <b>Devices:</b> {devices.length}
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}

export default LocationCard;

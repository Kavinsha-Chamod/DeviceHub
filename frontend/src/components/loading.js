import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import './styles/loading.css'; // Import custom CSS file

export default function Loading() {
  return (
    <div className="loading-container">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  )
}

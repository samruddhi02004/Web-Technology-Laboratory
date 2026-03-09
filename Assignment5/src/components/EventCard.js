import React from "react";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div style={cardStyle}>
      <h3>{event.title}</h3>
      <p><b>Date:</b> {event.date}</p>
      <p><b>Location:</b> {event.location}</p>
      <Link to={`/event/${event.id}`}>View Details</Link>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  margin: "15px",
  borderRadius: "8px",
  boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
};

export default EventCard;
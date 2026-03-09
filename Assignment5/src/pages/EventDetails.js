import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function EventDetails({ events, deleteEvent }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return <h2>Event Not Found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{event.title}</h2>
      <p><b>Date:</b> {event.date}</p>
      <p><b>Location:</b> {event.location}</p>
      <p><b>Description:</b> {event.description}</p>

      <button onClick={() => alert("Registered Successfully!")}>
        Register
      </button>
      <button onClick={() => navigate(`/edit/${event.id}`)} style={{ marginLeft: "8px" }}>
        Edit
      </button>
      <button
        onClick={() => {
          if (window.confirm("Delete this event?")) {
            deleteEvent(event.id);
            navigate("/");
          }
        }}
        style={{ marginLeft: "8px" }}
      >
        Delete
      </button>
    </div>
  );
}

export default EventDetails;

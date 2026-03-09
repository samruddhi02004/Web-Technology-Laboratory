import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEvent.css";

function AddEvent({ addEvent, events, updateEvent }) {
  const { id } = useParams();
  const eventId = id ? parseInt(id, 10) : null;
  const eventToEdit = eventId
    ? events.find((event) => event.id === eventId)
    : null;

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    type: "event"
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title || "",
        date: eventToEdit.date || "",
        location: eventToEdit.location || "",
        description: eventToEdit.description || "",
        type: eventToEdit.type || "event"
      });
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventPayload = {
      title: formData.title.trim(),
      date: formData.date,
      location: formData.location.trim(),
      description: formData.description.trim(),
      type: formData.type
    };

    if (eventToEdit) {
      updateEvent({ ...eventPayload, id: eventToEdit.id });
      navigate("/");
      return;
    }

    addEvent(eventPayload);
    navigate("/");
  };

  if (eventId && !eventToEdit) {
    return <h2 className="add-event-not-found">Event Not Found</h2>;
  }

  return (
    <main className="add-event-page">
      <section className="add-event-card">
        <p className="add-event-kicker">Event Management</p>
        <h2>{eventToEdit ? "Edit Event Details" : "Create New Event"}</h2>
        <p className="add-event-subtitle">
          {eventToEdit
            ? "Update the event details and save your changes."
            : "Fill in the event information and publish it for students."}
        </p>

        <form onSubmit={handleSubmit} className="add-event-form">
          <label className="field">
            <span>Event Title</span>
            <input
              type="text"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Event Type</span>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="event">Event</option>
              <option value="workshop">Workshop</option>
              <option value="club">Club Activity</option>
            </select>
          </label>

          <label className="field">
            <span>Date</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Location</span>
            <input
              type="text"
              name="location"
              placeholder="Enter venue"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field field-full">
            <span>Description</span>
            <textarea
              name="description"
              placeholder="Describe agenda, audience, and key outcomes"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </label>

          <div className="add-event-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {eventToEdit ? "Save Changes" : "Publish Event"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AddEvent;

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home({ events, deleteEvent }) {
  const navigate = useNavigate();

  const objectives = [
    "Provide an online platform for displaying college events.",
    "Allow students to easily access details about workshops and seminars.",
    "Provide a simple and user-friendly event registration process.",
    "Improve communication between students and event organizers.",
    "Demonstrate the use of React for building modern web applications."
  ];

  const studentFeatures = [
    { label: "View upcoming events", action: "events" },
    { label: "Check event details", action: "details" },
    { label: "Register for events", action: "register" },
    { label: "Explore different club activities", action: "clubs" }
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    department: "",
    eventId: ""
  });
  const [message, setMessage] = useState("");
  const [showUpcomingOnClick, setShowUpcomingOnClick] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const upcomingEvents = useMemo(
    () => events.filter((item) => item.date >= today),
    [events, today]
  );

  const upcomingByType = useMemo(
    () => ({
      event: upcomingEvents.filter((item) => item.type === "event"),
      workshop: upcomingEvents.filter((item) => item.type === "workshop"),
      club: upcomingEvents.filter((item) => item.type === "club")
    }),
    [upcomingEvents]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (message) setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedEvent = upcomingEvents.find(
      (item) => item.id === Number(formData.eventId)
    );

    if (!selectedEvent) {
      setMessage("Please select a valid upcoming activity.");
      return;
    }

    setMessage(
      `${formData.name} registered successfully for ${selectedEvent.title}.`
    );
    setFormData({
      name: "",
      email: "",
      rollNo: "",
      department: "",
      eventId: ""
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleStudentFeatureClick = (action) => {
    if (action === "events") {
      setShowUpcomingOnClick(true);
      setTimeout(() => scrollToSection("upcoming-click-section"), 0);
      return;
    }

    if (action === "register") {
      scrollToSection("registration-section");
      return;
    }

    if (action === "clubs") {
      scrollToSection("clubs-section");
      return;
    }

    if (action === "details") {
      const firstUpcoming = upcomingEvents[0];
      if (firstUpcoming) {
        navigate(`/event/${firstUpcoming.id}`);
      } else {
        setMessage("No upcoming event available for details right now.");
      }
    }
  };

  const renderSection = (id, title, items) => (
    <section className="section-block" id={id}>
      <h3 className="section-title">{title}</h3>
      {items.length === 0 ? (
        <p className="empty-state">No upcoming {title.toLowerCase()}.</p>
      ) : (
        <div className="activity-grid">
          {items.map((item) => (
            <article key={item.id} className="activity-card">
              <div className="activity-head">
                <h4>{item.title}</h4>
                <span className={`type-pill type-${item.type}`}>{item.type}</span>
              </div>
              <p className="activity-meta">
                <b>Date:</b> {formatDate(item.date)}
              </p>
              <p className="activity-meta">
                <b>Location:</b> {item.location}
              </p>
              <p className="activity-description">{item.description}</p>
              <div className="card-actions">
                <button
                  type="button"
                  className="card-btn card-btn-view"
                  onClick={() => navigate(`/event/${item.id}`)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="card-btn card-btn-edit"
                  onClick={() => navigate(`/edit/${item.id}`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="card-btn card-btn-delete"
                  onClick={() => {
                    if (window.confirm("Delete this event?")) {
                      deleteEvent(item.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <main className="home-page">
      <section className="intro-card">
        <h1>College Event Management System</h1>
        <p className="intro-text">
          A web-based platform that helps students stay informed about college
          workshops, seminars, competitions, and club activities from one
          centralized place.
        </p>
        <p className="intro-text">
          Instead of depending only on notice boards or social media posts, this
          system provides all event information in one location for easy access.
        </p>

        <div className="intro-grid">
          <div className="intro-block">
            <h3>Students Can</h3>
            <ul className="feature-list">
              {studentFeatures.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className="feature-btn"
                    onClick={() => handleStudentFeatureClick(item.action)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="intro-block">
            <h3>Objectives</h3>
            <ul>
              {objectives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="hero-card">
        <div>
          <p className="hero-kicker">Student Information Dashboard</p>
          <h2>College Event Management Portal</h2>
          <p className="hero-subtitle">
            Track all upcoming events in one place and register quickly using
            the built-in student form.
          </p>
        </div>
        <div className="stat-grid">
          <div className="stat-item">
            <span>{upcomingByType.event.length}</span>
            <p>Events</p>
          </div>
          <div className="stat-item">
            <span>{upcomingByType.workshop.length}</span>
            <p>Workshops</p>
          </div>
          <div className="stat-item">
            <span>{upcomingByType.club.length}</span>
            <p>Club Activities</p>
          </div>
        </div>
      </section>

      {showUpcomingOnClick && (
        <section className="section-block" id="upcoming-click-section">
          <h3 className="section-title">Upcoming Events</h3>
          {upcomingEvents.length === 0 ? (
            <p className="empty-state">No upcoming activities available right now.</p>
          ) : (
            <div className="activity-grid">
              {upcomingEvents.map((item) => (
                <article key={item.id} className="activity-card">
                  <div className="activity-head">
                    <h4>{item.title}</h4>
                    <span className={`type-pill type-${item.type}`}>{item.type}</span>
                  </div>
                  <p className="activity-meta">
                    <b>Date:</b> {formatDate(item.date)}
                  </p>
                  <p className="activity-meta">
                    <b>Location:</b> {item.location}
                  </p>
                  <p className="activity-description">{item.description}</p>
                  <div className="card-actions">
                    <button
                      type="button"
                      className="card-btn card-btn-view"
                      onClick={() => navigate(`/event/${item.id}`)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="card-btn card-btn-edit"
                      onClick={() => navigate(`/edit/${item.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="card-btn card-btn-delete"
                      onClick={() => {
                        if (window.confirm("Delete this event?")) {
                          deleteEvent(item.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {renderSection("events-section", "Events", upcomingByType.event)}
      {renderSection("workshops-section", "Workshops", upcomingByType.workshop)}
      {renderSection("clubs-section", "Club Activities", upcomingByType.club)}

      <section className="form-card" id="registration-section">
        <h3 className="section-title">Student Event Registration Form</h3>
        <form onSubmit={handleSubmit} className="registration-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-control"
          />
          <input
            type="email"
            name="email"
            placeholder="College Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-control"
          />
          <input
            type="text"
            name="rollNo"
            placeholder="Roll Number"
            value={formData.rollNo}
            onChange={handleChange}
            required
            className="input-control"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
            className="input-control"
          />
          <select
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            required
            className="input-control"
          >
            <option value="">Select Activity</option>
            {upcomingEvents.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} ({formatDate(item.date)})
              </option>
            ))}
          </select>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        {message && <p className="success-message">{message}</p>}
      </section>
    </main>
  );
}

const formatDate = (dateText) =>
  new Date(dateText).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

export default Home;

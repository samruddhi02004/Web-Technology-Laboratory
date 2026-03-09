import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import EventDetails from "./pages/EventDetails";

function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Sanjivani Innovation Hackathon 2026",
      type: "event",
      date: "2026-04-10",
      location: "Main Auditorium",
      description: "24 hour coding competition"
    },
    {
      id: 2,
      title: "UI/UX Design Bootcamp",
      type: "workshop",
      date: "2026-03-25",
      location: "Seminar Hall B",
      description: "Hands-on workshop on design thinking and prototyping"
    },
    {
      id: 3,
      title: "Robotics Club Weekly Build",
      type: "club",
      date: "2026-03-28",
      location: "Robotics Lab 3",
      description: "Club activity focused on autonomous bot assembly"
    },
    {
      id: 4,
      title: "Annual Technical Symposium",
      type: "event",
      date: "2026-04-18",
      location: "SCOE Convention Center",
      description: "Paper presentations, project expo, and expert keynote sessions"
    },
    {
      id: 5,
      title: "Coding Interview Preparation Workshop",
      type: "workshop",
      date: "2026-03-30",
      location: "Computer Center 2",
      description: "DSA practice, mock interviews, and resume feedback"
    },
    {
      id: 6,
      title: "Entrepreneurship Cell Meetup",
      type: "club",
      date: "2026-04-02",
      location: "Innovation Incubation Room",
      description: "Startup idea pitching and mentorship networking"
    },
    {
      id: 7,
      title: "Cultural Night 2026",
      type: "event",
      date: "2026-04-22",
      location: "Sanjivani Open Air Theatre",
      description: "Dance, music, drama performances, and inter-department competitions"
    },
    {
      id: 8,
      title: "IoT and Embedded Systems Workshop",
      type: "workshop",
      date: "2026-04-05",
      location: "ECE Lab Block",
      description: "Build and deploy smart sensor systems with guided lab sessions"
    },
    {
      id: 9,
      title: "NSS Community Outreach Drive",
      type: "club",
      date: "2026-04-12",
      location: "NSS Activity Cell",
      description: "Social impact planning and volunteering activity coordination"
    },
    {
      id: 10,
      title: "Sports Week Opening Ceremony",
      type: "event",
      date: "2026-03-20",
      location: "College Main Ground",
      description: "Kickoff ceremony with athlete march-past and team announcements"
    }
  ]);

  const addEvent = (newEvent) => {
    setEvents([
      ...events,
      { ...newEvent, type: newEvent.type || "event", id: events.length + 1 }
    ]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
      )
    );
  };

  const deleteEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home events={events} deleteEvent={deleteEvent} />}
        />
        <Route
          path="/add"
          element={<AddEvent addEvent={addEvent} events={events} updateEvent={updateEvent} />}
        />
        <Route
          path="/edit/:id"
          element={<AddEvent addEvent={addEvent} events={events} updateEvent={updateEvent} />}
        />
        <Route
          path="/event/:id"
          element={<EventDetails events={events} deleteEvent={deleteEvent} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

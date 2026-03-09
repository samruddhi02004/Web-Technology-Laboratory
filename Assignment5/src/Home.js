import React, { useState } from "react";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Hackathon 2026",
      date: "2026-04-10",
      location: "Auditorium",
    },
    {
      id: 2,
      title: "Cultural Fest",
      date: "2026-03-25",
      location: "Main Ground",
    },
  ]);

  return (
    <div>
      <h2>All Events</h2>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default Home;

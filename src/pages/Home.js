import EventList from "../components/EventList";
import EventDetails from "../components/EventDetails";
import { useEffect, useState } from "react";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch("/api/events", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.headers.get('content-type').includes('application/json')) {
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch events');
          }
          setEvents(data);
        } else {
          throw new Error('The server did not send back JSON.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setError(error.message);
      }
    };

    getEvents();
  }, []);

  return (
    <div className="home">
    {error && <p className="error-message">Error: {error}</p>} {/* Display the error message */}
    <EventList events={events} />
    <div className="events">
      {events.length === 0 && !error && <h2>No Events Found</h2>} {/* Only show if no error */}
      {events.map((event) => (
        <EventDetails key={event._id} event={event} />
      ))}
    </div>
  </div>
);
};
export default Home;

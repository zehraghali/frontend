import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const EventDetails = ({ event, onEventsChanged }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/events/${event._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onEventsChanged();
      navigate('/events'); // Assuming you have a route for '/events'
    } catch (error) {
      console.error('Failed to delete the event:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/events/${event._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedEvent),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setEditMode(false);
      onEventsChanged();
      navigate('/events');
    } catch (error) {
      console.error('Failed to update the event:', error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  // Assuming you want to handle adding a product/service, not an event.
  // If you intend to add an event, you should change the function parameter to reflect that.
  const handleAddEvent = async (event) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onEventsChanged(); // Assuming you also want to trigger a state update for the events list
    } catch (error) {
      console.error('Failed to add the product:', error);
    }
  };

  const handleEventChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  if (editMode) {
    return (
      <div className="event-edit-form">
        <input type="text" name="title" value={editedEvent.title} onChange={handleEventChange} />
        {/* Add other fields for event editing */}
        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="event-details">
      <h4>{event.title}</h4>
      <p>{formatDistanceToNow(new Date(event.date), { addSuffix: true })}</p>
      <button onClick={handleDelete}>Delete Event</button>
      <button onClick={handleEdit}>Edit Event</button>
      <button onClick={() => handleAddEvent(event)}>Add To Calendar</button>
      {/* The form for adding a product/service should probably be in its own component. */}
      {/* <AddProductForm onProductAdded={onEventsChanged} /> */}
    </div>
  );
};

export default EventDetails;
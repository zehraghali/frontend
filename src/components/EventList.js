import { useState } from 'react';

const  EventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Clear form fields after submission
    setFormData({
      title: '',
      description: '',
      date: '',
      location: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <label>Location:</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
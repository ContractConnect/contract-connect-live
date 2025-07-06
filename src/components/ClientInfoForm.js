import React, { useState } from 'react';

export default function ClientInfoForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', contact: 'Email',
    room: '', tasks: [], photos: [], estimate: 0
  });

  const taskPricing = {
    paint: 2.25,
    flooring: 6.25,
    drywall: 350,
    lighting: 175
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTaskChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      tasks: checked
        ? [...prev.tasks, value]
        : prev.tasks.filter(task => task !== value)
    }));
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, photos: files }));
  };

  const calculateEstimate = () => {
    let total = 0;
    for (const task of formData.tasks) {
      if (task === 'drywall') total += taskPricing[task]; // flat per room
      else total += 150 * taskPricing[task]; // estimate for 150 sqft room
    }
    setFormData(prev => ({ ...prev, estimate: total }));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Client Intake Form</h2>

      <input name="name" placeholder="Full Name" onChange={handleChange} style={inputStyle} />
      <input name="email" placeholder="Email" onChange={handleChange} style={inputStyle} />
      <input name="phone" placeholder="Phone" onChange={handleChange} style={inputStyle} />
      <input name="address" placeholder="Project Address" onChange={handleChange} style={inputStyle} />

      <label>Contact Preference:</label>
      <select name="contact" value={formData.contact} onChange={handleChange} style={inputStyle}>
        <option value="Email">Email</option>
        <option value="Phone">Phone</option>
        <option value="Either">Either</option>
      </select>

      <label>Room Type:</label>
      <select name="room" value={formData.room} onChange={handleChange} style={inputStyle}>
        <option value="">Select...</option>
        <option value="Kitchen">Kitchen</option>
        <option value="Bathroom">Bathroom</option>
        <option value="Bedroom">Bedroom</option>
      </select>

      <label>Work Needed:</label><br />
      <label><input type="checkbox" value="paint" onChange={handleTaskChange} /> Paint</label><br />
      <label><input type="checkbox" value="flooring" onChange={handleTaskChange} /> Flooring</label><br />
      <label><input type="checkbox" value="drywall" onChange={handleTaskChange} /> Drywall</label><br />
      <label><input type="checkbox" value="lighting" onChange={handleTaskChange} /> Recessed Lighting</label><br />

      <label>Upload Photos:</label><br />
      <input type="file" multiple onChange={handleFiles} style={inputStyle} />

      <button onClick={calculateEstimate} style={buttonStyle}>Get Estimate</button>

      {formData.estimate > 0 && (
        <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          Estimate: ${formData.estimate.toLocaleString()}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '1rem',
  padding: '0.5rem'
};

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  background: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

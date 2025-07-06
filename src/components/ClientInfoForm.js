
import React, { useState } from 'react';

export default function ClientInfoForm() {
  const [step, setStep] = useState(1);
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
      if (task === 'drywall') total += taskPricing[task];
      else total += 150 * taskPricing[task]; // 150 sqft estimate
    }
    setFormData(prev => ({ ...prev, estimate: total }));
  };

  const nextStep = () => {
    if (step === 3) calculateEstimate();
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div style={pageWrapper}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>Get Your Free Project Estimate</h2>

        {step === 1 && (
          <>
            <input name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} style={inputStyle} />
            <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} style={inputStyle} />
            <input name="phone" placeholder="Phone" onChange={handleChange} value={formData.phone} style={inputStyle} />
            <input name="address" placeholder="Project Address" onChange={handleChange} value={formData.address} style={inputStyle} />
            <label style={labelStyle}>Preferred Contact Method</label>
            <select name="contact" onChange={handleChange} value={formData.contact} style={inputStyle}>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="Either">Either</option>
            </select>
          </>
        )}

        {step === 2 && (
          <>
            <label style={labelStyle}>Room Type</label>
            <select name="room" onChange={handleChange} value={formData.room} style={inputStyle}>
              <option value="">Select...</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bathroom">Bathroom</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Living Room">Living Room</option>
            </select>

            <label style={labelStyle}>What work do you need?</label>
            <div style={checkboxGroup}>
              <label><input type="checkbox" value="paint" onChange={handleTaskChange} /> Paint</label>
              <label><input type="checkbox" value="flooring" onChange={handleTaskChange} /> Flooring</label>
              <label><input type="checkbox" value="drywall" onChange={handleTaskChange} /> Drywall Repair</label>
              <label><input type="checkbox" value="lighting" onChange={handleTaskChange} /> Recessed Lighting</label>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <label style={labelStyle}>Upload Photos (optional)</label>
            <input type="file" multiple onChange={handleFiles} style={inputStyle} />
            <button onClick={calculateEstimate} style={buttonStyle}>Calculate Estimate</button>
            {formData.estimate > 0 && (
              <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                Estimated Total: ${formData.estimate.toLocaleString()}
              </div>
            )}
          </>
        )}

        <div style={buttonRow}>
          {step > 1 && (
            <button onClick={prevStep} style={secondaryButton}>Back</button>
          )}
          {step < 3 && (
            <button onClick={nextStep} style={buttonStyle}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

const pageWrapper = {
  minHeight: '100vh',
  background: '#f7f7f7',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem'
};

const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  padding: '2rem',
  maxWidth: '480px',
  width: '100%',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
};

const headerStyle = {
  marginBottom: '1.5rem',
  fontSize: '1.4rem',
  fontWeight: 'bold'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: '600'
};

const checkboxGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginBottom: '1rem'
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '1rem'
};

const secondaryButton = {
  ...buttonStyle,
  backgroundColor: '#eee',
  color: '#333'
};

const buttonRow = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
  marginTop: '1rem'
};

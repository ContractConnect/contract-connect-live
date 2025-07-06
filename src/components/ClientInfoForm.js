import React, { useState } from 'react';

export default function ClientInfoForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
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

  const stepTitles = ['Contact Info', 'Project Scope', 'Upload & Estimate'];

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
      else total += 150 * taskPricing[task]; // avg room = 150 sqft
    }
    setFormData(prev => ({ ...prev, estimate: total }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Required';
      if (!formData.email) newErrors.email = 'Required';
      if (!formData.address) newErrors.address = 'Required';
    }
    if (step === 2) {
      if (!formData.room) newErrors.room = 'Select a room type';
      if (formData.tasks.length === 0) newErrors.tasks = 'Select at least one task';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (step === 3) {
      calculateEstimate();
      setSubmitted(true);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setErrors({});
  };

  const renderPreview = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {formData.photos.map((file, idx) => (
        <img key={idx} src={URL.createObjectURL(file)} alt="preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }} />
      ))}
    </div>
  );

  if (submitted) {
    return (
      <div style={pageWrapper}>
        <div style={cardStyle}>
          <h2 style={headerStyle}>Thanks, {formData.name.split(' ')[0]}!</h2>
          <p>We've received your request and will follow up shortly.</p>
          <p><strong>Estimate:</strong> ${formData.estimate.toLocaleString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
      <div style={cardStyle}>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Step {step} of 3: <strong>{stepTitles[step - 1]}</strong>
        </p>
        <h2 style={headerStyle}>Get Your Free Project Estimate</h2>

        {step === 1 && (
          <>
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" error={errors.name} />
            <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" error={errors.email} />
            <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (optional)" />
            <Input name="address" value={formData.address} onChange={handleChange} placeholder="Project Address" error={errors.address} />
            <label style={labelStyle}>Contact Preference</label>
            <select name="contact" onChange={handleChange} value={formData.contact} style={inputStyle}>
              <option>Email</option>
              <option>Phone</option>
              <option>Either</option>
            </select>
          </>
        )}

        {step === 2 && (
          <>
            <label style={labelStyle}>Room Type</label>
            <select name="room" value={formData.room} onChange={handleChange} style={inputStyle}>
              <option value="">Select...</option>
              <option>Kitchen</option>
              <option>Bathroom</option>
              <option>Bedroom</option>
              <option>Living Room</option>
            </select>
            {errors.room && <ErrorText text={errors.room} />}

            <label style={labelStyle}>Work Needed</label>
            <div style={checkboxGroup}>
              {['paint', 'flooring', 'drywall', 'lighting'].map(task => (
                <label key={task}>
                  <input type="checkbox" value={task} checked={formData.tasks.includes(task)} onChange={handleTaskChange} />
                  {' '}{task[0].toUpperCase() + task.slice(1)}
                </label>
              ))}
            </div>
            {errors.tasks && <ErrorText text={errors.tasks} />}
          </>
        )}

        {step === 3 && (
          <>
            <label style={labelStyle}>Upload Photos</label>
            <input type="file" multiple onChange={handleFiles} style={inputStyle} />
            {formData.photos.length > 0 && renderPreview()}
          </>
        )}

        <div style={buttonRow}>
          {step > 1 && (
            <button onClick={prevStep} style={secondaryButton}>Back</button>
          )}
          <button onClick={nextStep} style={buttonStyle}>
            {step === 3 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ========== Subcomponents ==========

function Input({ name, value, onChange, placeholder, error }) {
  return (
    <>
      <input name={name} value={value} onChange={onChange} placeholder={placeholder} style={inputStyle} />
      {error && <ErrorText text={error} />}
    </>
  );
}

function ErrorText({ text }) {
  return <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '-0.5rem', marginBottom: '1rem' }}>{text}</div>;
}

// ========== Styles ==========

const pageWrapper = {
  minHeight: '100vh',
  background: '#f4f4f4',
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
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)'
};

const headerStyle = {
  marginBottom: '1rem',
  fontSize: '1.5rem',
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
  backgroundColor: '#eaeaea',
  color: '#333'
};

const buttonRow = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
  marginTop: '1rem'
};

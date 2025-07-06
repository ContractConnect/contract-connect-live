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
      else total += 150 * taskPricing[task];
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
      if (!formData.room) newErrors.room = 'Required';
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
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const renderPreview = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
      {formData.photos.map((file, idx) => (
        <img key={idx} src={URL.createObjectURL(file)} alt="preview"
             style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
      ))}
    </div>
  );

  if (submitted) {
    return (
      <div style={wrapper}>
        <div style={logoWrapper}>
          <img src="/ContractConnect_Logo_Smaller.png" alt="Contract Connect Logo" style={logoStyle} />
        </div>
        <div style={card}>
          <h2 style={title}>Thank You, {formData.name.split(' ')[0]}!</h2>
          <p>We’ve received your request and will follow up shortly.</p>
          <p><strong>Estimated Total:</strong> ${formData.estimate.toLocaleString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={wrapper}>
      <div style={logoWrapper}>
        <img src="/ContractConnect_Logo_Smaller.png" alt="Contract Connect Logo" style={logoStyle} />
      </div>
      <div style={card}>
        <ProgressBar step={step} total={3} />
        <h2 style={title}>{stepTitles[step - 1]}</h2>

        {step === 1 && (
          <>
            <Field name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" error={errors.name} />
            <Field name="email" value={formData.email} onChange={handleChange} placeholder="Email" error={errors.email} />
            <Field name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (optional)" />
            <Field name="address" value={formData.address} onChange={handleChange} placeholder="Project Address" error={errors.address} />
            <label style={label}>Preferred Contact Method</label>
            <select name="contact" value={formData.contact} onChange={handleChange} style={input}>
              <option>Email</option>
              <option>Phone</option>
              <option>Either</option>
            </select>
          </>
        )}

        {step === 2 && (
          <>
            <label style={label}>Room Type</label>
            <select name="room" value={formData.room} onChange={handleChange} style={input}>
              <option value="">Select...</option>
              <option>Kitchen</option>
              <option>Bathroom</option>
              <option>Bedroom</option>
              <option>Living Room</option>
            </select>
            {errors.room && <Error text={errors.room} />}

            <label style={label}>Tasks Needed</label>
            <div style={checkboxGroup}>
              {['paint', 'flooring', 'drywall', 'lighting'].map(task => (
                <label key={task}><input type="checkbox" value={task} checked={formData.tasks.includes(task)} onChange={handleTaskChange} /> {task}</label>
              ))}
            </div>
            {errors.tasks && <Error text={errors.tasks} />}
          </>
        )}

        {step === 3 && (
          <>
            <label style={label}>Upload Photos</label>
            <input type="file" multiple onChange={handleFiles} style={input} />
            {formData.photos.length > 0 && renderPreview()}
          </>
        )}

        <div style={buttonRow}>
          {step > 1 && <button style={secondaryBtn} onClick={prevStep}>Back</button>}
          <button style={primaryBtn} onClick={nextStep}>{step === 3 ? 'Submit' : 'Next'}</button>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ step, total }) {
  const percent = (step - 1) / (total - 1) * 100;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ height: 6, background: '#eee', borderRadius: 10 }}>
        <div style={{ width: `${percent}%`, height: '100%', background: '#c80000', borderRadius: 10, transition: 'width 0.3s ease' }} />
      </div>
      <p style={{ fontSize: '0.9rem', marginTop: 8, color: '#555' }}>
        Step {step} of {total}
      </p>
    </div>
  );
}

function Field({ name, value, onChange, placeholder, error }) {
  return (
    <>
      <input name={name} value={value} onChange={onChange} placeholder={placeholder} style={input} />
      {error && <Error text={error} />}
    </>
  );
}

function Error({ text }) {
  return <div style={{ color: 'red', fontSize: '0.8rem', marginBottom: '1rem' }}>{text}</div>;
}

// Styles
const wrapper = {
  minHeight: '100vh',
  background: '#f5f5f5',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '0px 1rem 1rem',
  marginTop: '0'
};

const logoWrapper = {
  textAlign: 'center',
  marginBottom: '0px'
};

const logoStyle = {
  width: '250px',
  height: 'auto',
  display: 'block',
  marginBottom: '1rem'
};

const card = {
  background: '#fff',
  borderRadius: 12,
  padding: '2rem',
  maxWidth: 500,
  width: '100%',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
};

const title = {
  fontSize: '1.4rem',
  fontWeight: 600,
  color: '#c80000',
  marginBottom: '1.25rem'
};

const input = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: '1rem',
  marginBottom: '1rem'
};

const label = {
  fontWeight: 'bold',
  marginBottom: '0.25rem',
  display: 'block'
};

const checkboxGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginBottom: '1rem'
};

const buttonRow = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
  marginTop: '1.5rem'
};

const primaryBtn = {
  flex: 1,
  background: '#c80000',
  color: '#fff',
  border: 'none',
  padding: '0.75rem',
  borderRadius: 6,
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer'
};

const secondaryBtn = {
  ...primaryBtn,
  background: '#eee',
  color: '#333'
};

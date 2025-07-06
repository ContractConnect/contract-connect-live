
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const services = [
    { key: 'plumbing', label: 'Plumbing', icon: 'fa-faucet' },
    { key: 'electrical', label: 'Electrical', icon: 'fa-bolt' },
    { key: 'roofing', label: 'Roofing', icon: 'fa-house-chimney' },
    { key: 'hvac', label: 'HVAC', icon: 'fa-temperature-high' },
    { key: 'painting', label: 'Painting', icon: 'fa-paint-roller' },
    { key: 'windows', label: 'Windows', icon: 'fa-window-maximize' },
    { key: 'concrete', label: 'Concrete', icon: 'fa-road' },
    { key: 'landscaping', label: 'Landscaping', icon: 'fa-tree' },
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#fff' }}>
      {/* Hero Section */}
      <div style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '2rem',
          borderRadius: 12,
          display: 'inline-block'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Find top-rated pros in your area.
          </h1>
          <input type="text" placeholder="What can we help you with?"
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              borderRadius: '6px 0 0 6px',
              border: 'none',
              width: '300px'
            }} />
          <input type="text" placeholder="ZIP"
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: 'none',
              width: '100px'
            }} />
          <button style={{
            background: '#c80000',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '0 6px 6px 0',
            cursor: 'pointer'
          }}>
            Search
          </button>
        </div>
      </div>

      {/* Service Icon Grid */}
      <div style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
        {services.map(s => (
          <div key={s.key} onClick={() => navigate('/form')} style={{
            textAlign: 'center',
            width: 100,
            cursor: 'pointer'
          }}>
            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #c80000',
              borderRadius: '50%',
              width: 70,
              height: 70,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              marginBottom: '0.5rem'
            }}>
              <i className={`fas ${s.icon}`} style={{ fontSize: '1.5rem', color: '#c80000' }} />
            </div>
            <div style={{ color: '#c80000', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

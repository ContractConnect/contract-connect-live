import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isNew) {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2 style={title}>{isNew ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            style={input}
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            required
            style={input}
          />
          {error && <div style={errorStyle}>{error}</div>}
          <button type="submit" style={button}>
            {isNew ? 'Create Account' : 'Login'}
          </button>
        </form>
        <p style={toggleText}>
          {isNew ? 'Already have an account?' : 'New here?'}{' '}
          <span onClick={() => setIsNew(!isNew)} style={link}>
            {isNew ? 'Login' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  );
}

// Styles
const wrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: '#f5f5f5'
};

const card = {
  background: '#fff',
  padding: '2rem',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: 400
};

const title = {
  color: '#c80000',
  marginBottom: '1rem',
  fontSize: '1.5rem',
  fontWeight: 600,
  textAlign: 'center'
};

const input = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const button = {
  width: '100%',
  background: '#c80000',
  color: '#fff',
  border: 'none',
  padding: '0.75rem',
  borderRadius: 6,
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer'
};

const toggleText = {
  marginTop: '1rem',
  textAlign: 'center',
  fontSize: '0.95rem'
};

const link = {
  color: '#c80000',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const errorStyle = {
  color: 'red',
  fontSize: '0.85rem',
  marginBottom: '1rem'
};

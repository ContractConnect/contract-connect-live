import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const q = query(collection(db, 'projects'), where('userId', '==', u.uid));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(items);
      } else {
        navigate('/login');
      }
    });
    return unsubscribe;
  }, [auth, db, navigate]);

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  return (
    <div style={page}>
      <div style={header}>
        <h2 style={{ margin: 0 }}>My Estimates</h2>
        <button onClick={handleLogout} style={logoutBtn}>Logout</button>
      </div>
      {projects.length === 0 ? (
        <p>No estimates found.</p>
      ) : (
        <div style={grid}>
          {projects.map(p => (
            <div key={p.id} style={card}>
              <h3 style={{ color: '#c80000' }}>{p.room || 'Project'}</h3>
              <p><strong>Estimate:</strong> ${p.estimate?.toLocaleString() || 'N/A'}</p>
              <p><strong>Address:</strong> {p.address}</p>
              <p><strong>Date:</strong> {new Date(p.timestamp?.toDate?.() || Date.now()).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Styles
const page = {
  padding: '2rem',
  background: '#f9f9f9',
  minHeight: '100vh'
};

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem'
};

const logoutBtn = {
  background: '#c80000',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: 6,
  fontWeight: 'bold',
  cursor: 'pointer'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1rem'
};

const card = {
  background: '#fff',
  padding: '1rem',
  borderRadius: 10,
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
};

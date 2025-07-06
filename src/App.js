import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientInfoForm from './components/ClientInfoForm';
import PhotoUpload from './components/PhotoUpload';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientInfoForm />} />
        <Route path="/upload" element={<PhotoUpload />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
// App entry with routes for client form, upload, and admin

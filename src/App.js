import React from 'react';
import ClientInfoForm from './components/ClientInfoForm';

function App() {
  return <ClientInfoForm />;
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientInfoForm from './components/ClientInfoForm';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientInfoForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
import HomePage from './components/HomePage';

<Route path="/" element={<HomePage />} />
<Route path="/form" element={<ClientInfoForm />} />

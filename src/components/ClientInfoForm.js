import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function ClientInfoForm() {
  const db = getFirestore();
  const auth = getAuth();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', contact: 'Email',
    room: '', tasks: [], photos: []
  });
  const [estimate, setEstimate] = useState(0);

  const taskOptions = [
    { key: 'paint', label: 'Paint', icon: 'fa-paint-roller', rate: 2.25 },
    { key: 'flooring', label: 'Flooring', icon: 'fa-ruler-combined', rate: 6.25 },
    { key: 'drywall', label: 'Drywall', icon: 'fa-border-all', rate: 350 },
    { key: 'lighting', label: 'Lighting', icon: 'fa-lightbulb', rate: 175 },
    { key: 'plumbing', label: 'Plumbing', icon: 'fa-faucet', rate: 500 },
    { key: 'roofing', label: 'Roofing', icon: 'fa-house-chimney', rate: 850 },
    { key: 'hvac', label: 'HVAC', icon: 'fa-temperature-high', rate: 950 },
    { key: 'windows', label: 'Windows', icon: 'fa-window-maximize', rate: 650 },
    { key: 'doors', label: 'Doors', icon: 'fa-door-open', rate: 300 },
    { key: 'landscaping', label: 'Landscaping', icon: 'fa-tree', rate: 700 },
    { key: 'cabinets', label: 'Cabinets', icon: 'fa-kitchen-set', rate: 1200 }
  ];

  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    let total = 0;
    for (const task of formData.tasks) {
      const t = taskOptions.find(opt => opt.key === task);
      if (t) total += t.key === 'drywall' ? t.rate : t.rate * 150;
    }
    setEstimate(total);
  }, [formData.tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleTask = (task) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.includes(task)
        ? prev.tasks.filter(t => t !== task)
        : [...prev.tasks, task]
    }));
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, photos: files }));
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

  const nextStep = async () => {
    if (!validateStep()) return;
    if (step === 3) {
      const user = auth.currentUser;
      await addDoc(collection(db, 'projects'), {
        ...formData,
        estimate,
        userId: user?.uid || null,
        timestamp: serverTimestamp()
      });
      setSubmitted(true);
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  return (
    <div className="text-center p-8">
      <h2>Client Info Form Base Connected</h2>
      <p>Rendering steps and visual UI continue from here...</p>
    </div>
  );
}

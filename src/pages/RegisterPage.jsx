import React, { useState } from 'react';
import '../Auth.css';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }), // Map email to username for backend
    });

    const data = await response.json(); // <--- READ THE SERVER RESPONSE

    if (response.ok) {
      alert("Registration Successful! Please login.");
      window.location.href = '/login';
    } else {
      // Alert the ACTUAL error message from the server
      alert("Registration failed: " + (data.message || data.error)); 
    }
  } catch (err) {
    console.error(err);
    alert("Network Error: Is the backend server running?");
  }
};

  return (
    <section className="auth-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </section>
  );
}
import React, { useState } from 'react';
import '../Auth.css';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registering user: ${fullName}`);
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
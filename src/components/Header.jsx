import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="left-nav">
          <h1 className="logo">Online Bookshop</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.css';

const UserRegister = () => (
  <div className="form-container">
    <h2>User Register</h2>
    <form>
      <div className="form-group">
        <label htmlFor="name">Full Name:</label>
        <input type="text" id="name" name="name" required autoComplete="name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required autoComplete="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required autoComplete="new-password" />
      </div>
      <button type="submit">Register</button>
    </form>
    <Link className="form-link" to="/food-partner/signup">
      Register as Food Partner
    </Link>
  </div>
);

export default UserRegister;
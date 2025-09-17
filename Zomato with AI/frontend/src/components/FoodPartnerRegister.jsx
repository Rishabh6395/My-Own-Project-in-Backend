import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.css';

const FoodPartnerRegister = () => (
  <div className="form-container">
    <h2>Food Partner Register</h2>
    <form>
      <div className="form-group">
        <label htmlFor="restaurantName">Restaurant Name:</label>
        <input
          type="text"
          id="restaurantName"
          name="restaurantName"
          required
          autoComplete="organization"
          placeholder="e.g. Pizza Palace"
        />
      </div>
      <div className="form-row">
        <div className="form-group half">
          <label htmlFor="contactName">Contact Name:</label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            required
            autoComplete="name"
            placeholder="e.g. John Doe"
          />
        </div>
        <div className="form-group half">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            autoComplete="tel"
            placeholder="e.g. +91 9876543210"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          placeholder="e.g. contact@restaurant.com"
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          required
          autoComplete="street-address"
          placeholder="e.g. 123 Main St, City"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="new-password"
          placeholder="Create a password"
        />
      </div>
      <button type="submit">Register</button>
    </form>
    <Link className="form-link" to="/user/register">
      Register as Normal User
    </Link>
  </div>
);

export default FoodPartnerRegister;
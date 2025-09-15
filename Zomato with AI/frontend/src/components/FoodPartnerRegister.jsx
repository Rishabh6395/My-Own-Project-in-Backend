import React from 'react';
import '../styles/form.css';

const FoodPartnerRegister = () => (
  <div className="form-container">
    <h2>Food Partner Register</h2>
    <form>
      <div className="form-group">
        <label htmlFor="restaurant">Restaurant Name:</label>
        <input type="text" id="restaurant" name="restaurant" required autoComplete="organization" />
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
  </div>
);

export default FoodPartnerRegister;
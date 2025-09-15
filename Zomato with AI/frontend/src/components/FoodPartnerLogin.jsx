import React from 'react';
import '../styles/form.css';

const FoodPartnerLogin = () => (
  <div className="form-container">
    <h2>Food Partner Login</h2>
    <form>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required autoComplete="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required autoComplete="current-password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);

export default FoodPartnerLogin;
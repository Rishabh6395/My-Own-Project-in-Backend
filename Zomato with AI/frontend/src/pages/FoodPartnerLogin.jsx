import React from 'react';
import '../styles/form.css';
import { Link } from "react-router-dom";

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
    <div className="flex flex-column">
      <div className="login-option">
        <p className="text-center">
          Create an Account{" "}
          <Link className="form-link" to="/food-partner/login">
            Register as Food Partner
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default FoodPartnerLogin;
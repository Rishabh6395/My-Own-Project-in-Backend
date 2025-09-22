import React from 'react';
import '../styles/form.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    
    await (axios.post("http://localhost:3000/api/auth/foodpartner/login", { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
    )
    navigate("/create-food");
  }

  return(
  <div className="form-container">
    <h2>Food Partner Login</h2>
    <form onSubmit={handleSubmit}>
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
          <Link className="form-link" to="/food-partner/signup">
            Register as Food Partner
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default FoodPartnerLogin;
import React from "react";
import { Link } from "react-router-dom";
import "../styles/form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const restaurantName = e.target.restaurantName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    await (axios.post("http://localhost:3000/api/auth/foodpartner/register", { name: restaurantName, contactName, phone, email, password, address },
    {
      withCredentials: true
    })
    .then(res => console.log(res.data)

  )
    .catch(err => console.error(err))
    )
    navigate("/create-food");
  }

  return(
  <div className="form-container">
    <h2>Food Partner Register</h2>
    <form onSubmit={handleSubmit}>
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
    <div className="flex flex-column">
      <div className="login-option">
        <p className="text-center">
          Already Signup?{" "}
          <Link className="form-link" to="/food-partner/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default FoodPartnerRegister;

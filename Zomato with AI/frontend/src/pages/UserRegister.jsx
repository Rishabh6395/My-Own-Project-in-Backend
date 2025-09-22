import React from "react";
import { Link } from "react-router-dom";
import "../styles/form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const fullname = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await (axios.post("http://localhost:3000/api/auth/user/register", { fullname, email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
    )
    
    console.log("Full Name:", fullname);
    console.log("Email:", email);
    console.log("Password:", password);

    navigate("/");
    console.log(response.data);

    // Example API call (adjust URL and data structure as needed)
    // axios.post("/api/register", { fullname, email, password })
    //   .then(res => console.log(res.data))
    //   .catch(err => console.error(err));
  };

  return (
    <div className="form-container">
      <h2>User Register</h2>

      {/* ✅ Only ONE <form> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
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
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <div className="flex flex-column">
        <Link className="form-link" to="/food-partner/signup">
          Register as Food Partner
        </Link>
        <div className="login-option">
          <p className="text-center">
            Already a User?{" "}
            <Link className="form-link" to="/user/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;

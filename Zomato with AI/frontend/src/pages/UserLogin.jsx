import React from 'react';
import '../styles/form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    
    await (axios.post("http://localhost:3000/api/auth/user/login", { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
    )
    navigate("/");

  }

  return(
  <div className="form-container">
    <h2>User Login</h2>
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
  </div>
);
}

export default UserLogin;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/userContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [UserData, setUserData] = useState({})

  const navigate = useNavigate()

  const {user, setUser} = React.useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }
    const reponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (reponse.status === 201) {
      const data = reponse.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    // console.log(UserData)
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-5">
            <input
            required
            className="bg-[#f0f0f0] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
            <input
            required
            className="bg-[#f0f0f0] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="bg-[#f0f0f0] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium  mb-2">Enter Password</h3>

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#f0f0f0] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Create account
          </button>

          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight">By proceeding, you conset to get calls, Whatsapp or SMS messages, including by automated means, from Uber and its affiliates to the number provider.</p>
      </div>
    </div>
  );
};

export default UserSignup;

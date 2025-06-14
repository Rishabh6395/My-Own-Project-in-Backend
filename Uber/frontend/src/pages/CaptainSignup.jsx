import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [UserData, setUserData] = useState({})
  
    const submitHandler = (e) => {
      e.preventDefault();
      setUserData({
        fullName:{
          firstName: firstName,
          lastName: lastName
        },
        password: password,
        email: email
      })
      // console.log(UserData)
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
    }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-5"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg w-full font-medium mb-2">What's our Captain's name</h3>
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

          <h3 className="text-lg w-full font-medium mb-2">What's our Captain email</h3>
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
            Login
          </button>

          <p className="text-center">
            Already have an account?
            <Link to="/captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight">This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply.</span></p>
      </div>
    </div>
  )
}

export default CaptainSignup

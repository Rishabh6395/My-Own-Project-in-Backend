// import { useState, React } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DeveloperProfile from './pages/DeveloperProfile'
import RecruiterDashboard from './pages/RecruiterDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import AddProject from './pages/AddProject';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/developer/:id' element={<DeveloperProfile />} />
        <Route path='/recruiter' element={<RecruiterDashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add-project' element={<AddProject />} />
      </Routes>
    </Router>
  )
}

export default App

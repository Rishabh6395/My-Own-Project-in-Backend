// import { useState, React } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DeveloperProfile from './pages/DeveloperProfile'
import RecruiterDashboard from './pages/RecruiterDashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/developer/:id' element={<DeveloperProfile />} />
        <Route path='/recruiter' element={<RecruiterDashboard />} />
      </Routes>
    </Router>
  )
}

export default App

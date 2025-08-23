import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const [OTP, setOTP] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    
    if (!OTP) {
      alert('Please enter OTP')
      return
    }

    if (OTP.length < 4) {
      alert('OTP must be at least 4 characters')
      return
    }

    try {
      setLoading(true)
      
      // Debug logs
      // console.log('🔍 Debug Info:');
      // console.log('Base URL:', import.meta.env.VITE_BASE_URL);
      // console.log('Full URL:', `${import.meta.env.VITE_BASE_URL}/rides/start-ride`);
      // console.log('Ride ID:', props.ride._id);
      // console.log('OTP:', OTP);
      // console.log('Token:', localStorage.getItem('token') ? 'Present' : 'Missing');
      
      // Try alternative axios configuration
      const response = await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        data: {
          rideId: props.ride._id,
          otp: OTP
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('✅ Ride started successfully:', response.data)
      
      // Close the popup panels
      props.setConfirmRidePopupPanel(false)
      props.setRidePopupPanel(false)
      
      // Navigate to the captain riding page
      navigate('/captain-riding')
      
    } catch (error) {
      console.error('❌ Full Error Object:', error)
      console.error('❌ Error Response:', error.response)
      console.error('❌ Error Config:', error.config)
      
      if (error.response?.data?.message) {
        alert(error.response.data.message)
      } else if (error.response?.status === 404) {
        alert('Route not found. Please check if the backend server is running and routes are configured correctly.')
      } else {
        alert('Failed to start ride. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h5 className='p-1 text-center  w-[94%] absolute top-0' onClick={() => props.setRidePopupPanel(false)}>
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
      
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 object-cover rounded-full' src="https://img.freepik.com/free-photo/portrait-man-looking-front-him_23-2148422271.jpg?semt=ais_hybrid&w=740" alt="" />
          <h2 className='text-xl font-medium'>{props.ride?.userId?.fullname?.firstname || 'User'}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>

      <div className='flex gap-2 mt-4 justify-between flex-col items-center'>
        <div className='w-full'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-line"></i>
            <div>
              <h3 className='font-semibold text-lg'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='font-semibold text-lg'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='font-semibold text-lg'>₹{props.ride?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
        
        <div className='mt-6 w-full'>
          <form onSubmit={submitHandler}> 
            <input 
              value={OTP} 
              onChange={(e) => setOTP(e.target.value)} 
              type="text" 
              placeholder='Enter OTP' 
              className='bg-[#eee] px-6 py-4 text-lg font-mono rounded-lg mt-3 w-full'
              maxLength="6"
              disabled={loading}
            />
            
            {/* Debug info display */}
            <div className='mt-2 text-xs text-gray-500'>
              <p>Base URL: {import.meta.env.VITE_BASE_URL}</p>
              <p>Ride ID: {props.ride?._id}</p>
            </div>
            
            <button
              type="submit"
              disabled={loading || !OTP}
              className={`w-full mt-5 text-lg flex justify-center font-semibold p-2 rounded-lg ${
                loading || !OTP 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {loading ? 'Starting Ride...' : 'Confirm'}
            </button>
            <button 
              type="button"
              onClick={() => {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)
              }}
              disabled={loading}
              className='w-full mt-1 text-lg bg-red-500 text-white font-semibold p-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400'
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
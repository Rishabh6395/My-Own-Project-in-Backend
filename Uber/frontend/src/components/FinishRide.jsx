import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = (props) => {

  const navigate = useNavigate()

  async function endRide() {
    try {
      console.log('🔍 FinishRide Debug:');
      console.log('Ride ID:', props.ride?._id);
      console.log('Token from localStorage:', localStorage.getItem('token'));
      
      if (!props.ride?._id) {
        console.error('❌ No ride ID available');
        alert('Error: No ride ID available');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('❌ No token found');
        alert('Error: Authentication token not found. Please login again.');
        navigate('/captain-login');
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
        rideId: props.ride._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Ride ended successfully:', response.data);
      
      if (response.status === 200) {
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('❌ Error ending ride:', error);
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Failed to end ride'}`);
        
        if (error.response.status === 401) {
          // Token might be expired or invalid
          navigate('/captain-login');
        }
      } else {
        alert('Network error. Please try again.');
      }
    }
  }

  return (
    <div className='mt-16'>
      <h5 className='p-1 mt-10 text-center  w-[94%] absolute top-0' onClick={() => props.setFinishRidePanel(false)}>
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Finish this ride</h3>
      <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
            <img className='h-12 w-12 object-cover rounded-full' src="https://img.freepik.com/free-photo/portrait-man-looking-front-him_23-2148422271.jpg?semt=ais_hybrid&w=740" alt="" />
            <h2 className='text-lg font-medium'>{props.ride?.userId?.fullname?.firstname || 'User'}</h2>
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
                  <h3 className='font-semibold text-lg'>{props.ride?.fare}</h3>
                  <p className='text-sm -mt-1 text-gray-600'>Cash</p>
              </div>
            </div>
        </div>
          <div className='mt-10 w-full'>
                  <button
                    onClick={endRide}
              className='w-full text-lg mt-5 flex justify-center bg-green-600 text-white font-semibold p-2  rounded-lg'>Finish Ride</button>
              <p className=' mt-6 text-xs '>click on finish ride button if you have completed the payment</p>
          </div>
      </div>
    </div>
  )
}

export default FinishRide
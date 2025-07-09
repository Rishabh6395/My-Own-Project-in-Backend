import React from 'react'
import { Link } from 'react-router-dom'

const CaptainRiding = () => {
  return (
    <div className='h-screen overflow-hidden relative'>
          <div className='fixed p-3 top-0 mt-6 flex items-center justify-between w-screen'>
            <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <Link to='/captain-home' className='fixed right-2 top-0 mt-6 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-logout-box-r-line"></i>
            </Link>
          </div>
            <div className='h-4/5'>
                <img src="https://preview.redd.it/kkf7vpwywor61.jpg?width=640&crop=smart&auto=webp&s=0692b48c1e54ef0638db64b198d8220d9eb2085c" alt="" />

            </div>
            <div className='bg-white absolute h-full w-full'>
                <div className='h-1/5 p-4 flex justify-between items-center  bg-yellow-400 '>
                    <h4 className='text-2xl font-semibold'>4 KM Away</h4>
                    <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
                </div>
                  
            </div>
        </div>
  )
}

export default CaptainRiding

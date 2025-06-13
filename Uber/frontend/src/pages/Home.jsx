import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHRyYWZmaWMlMjBsaWdodHN8ZW58MHx8MHx8fDA%3D)] h-screen pt-8 flex w-full justify-between flex-col bg-red-400'>
      <img className='w-16 ml-8' src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png" alt="" />
      <div className='bg-white pb-7 py-4 px-4'>
        <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
        <Link to='/login' className='flex items-cneter justify-center w-full bg-black text-white py-3 mt-5 rounded-xl'>Continue</Link>
      </div>
    </div>
  )
}

export default Home

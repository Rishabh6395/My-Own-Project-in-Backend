import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'

const CaptainHome = () => {
//   const location = useLocation()
    // const { ride } = location.state || {} 
  return (
    <div className='h-screen overflow-hidden relative'>
          <div className='fixed p-3 top-0 mt-6 flex items-center justify-between w-screen'>
            <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <Link to='/captain-home' className='fixed right-2 top-0 mt-6 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-logout-box-r-line"></i>
            </Link>
          </div>
            <div className='h-3/5'>
                <img src="https://preview.redd.it/uber-doesnt-show-me-estimated-prices-and-hasnt-for-months-v0-2601fzw9tlwb1.jpg?width=640&crop=smart&auto=webp&s=ea3ac677b73a805880377ddd59b9e2e5fea5454a" alt="" />

            </div>
            <div className='bg-white absolute h-full w-full'>
                <div className='h-2/5 p-4 '>
                    <CaptainDetails/>
                </div>
            </div>
        </div>
  )
}

export default CaptainHome

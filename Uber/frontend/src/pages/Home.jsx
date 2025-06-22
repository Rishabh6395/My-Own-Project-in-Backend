import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState("")
  const [panelOpen, setPanelOpen] = useState(false)  
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function () {
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
        opacity: 1,
        ease: "power4.out"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        ease: "power4.out"
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0,
        ease: "power4.out"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        ease: "power4.out"
      })
    }
  }, [panelOpen])

  return (
    <div className=' h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className='h-screen w-screen object-cover'>
         {/* image for temp use */}
        <img src="https://preview.redd.it/uber-doesnt-show-me-estimated-prices-and-hasnt-for-months-v0-2601fzw9tlwb1.jpg?width=640&crop=smart&auto=webp&s=ea3ac677b73a805880377ddd59b9e2e5fea5454a" alt="" />

        <div className='flex flex-col justify-end absolute h-screen top-0 w-full '>
          <div className='h-[30%] p-6 bg-white relative'>
            <h5 ref={panelCloseRef} onClick={() =>{
              setPanelOpen(false)
            }} className='absolute opacity-0 right-6 top-6 text-2xl'>
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className='line absolute h-16 w-1 top-[43%] left-10 bg-gray-800 rounded-full '></div>
            <input
            onClick={() => {
              setPanelOpen(true)
            }}
            value={pickup}
            onChange={(e) => {
              setPickup(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a pickup location'/>
            <input
            onClick={() => {
              setPanelOpen(true)
            }}
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg mt-3 w-full' type="text" placeholder='Enter your destination'/>
          </form>
          </div>
          <div ref={panelRef} className='h-0 opacity-0 bg-white'>
            <LocationSearchPanel />
          </div>
        </div>
      </div>

      <div className='fixed w-full p-3 py-6 px-3 z-10 bottom-0 bg-white'>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div className='flex border-2 mb-2 active:border-black  rounded-xl p-3 w-full items-center justify-beween'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="" />
          <div className='ml-4 w-1/2'>
            <h4 className='text-base font-medium'>Uber Go <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='text-sm font-medium'>2 mins away</h5>
            <p className='text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
        <h2 className='text-lg pl-6 font-semibold'>$15.00</h2>
        </div>
        <div className='flex border-2 mb-2 active:border-black  rounded-xl p-3 w-full items-center justify-beween'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className='ml-4 w-1/2'>
            <h4 className='text-base font-medium'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='text-sm font-medium'>3 mins away</h5>
            <p className='text-xs text-gray-600'>Affordable, Motorcycle rides</p>
          </div>
        <h2 className='text-lg pl-6 font-semibold'>$6.00</h2>
        </div>
        <div className='flex border-2 mb-2 active:border-black  rounded-xl p-3 w-full items-center justify-beween'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className='ml-4 w-1/2'>
            <h4 className='text-base font-medium'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className='text-sm font-medium'>3 mins away</h5>
            <p className='text-xs text-gray-600'>Affordable, Auto rides</p>
          </div>
        <h2 className='text-lg pl-6 font-semibold'>$12.00</h2>
        </div>
      </div>
    </div>
  )
}

export default Home

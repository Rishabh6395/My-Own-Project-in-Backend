import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState("")
  const [panelOpen, setPanelOpen] = useState(false)  
  const panelRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function () {
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: '70%',
        ease: "power4.out"
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        ease: "power4.out"
      })
    }
  }, [panelOpen])

  return (
    <div className=' h-screen relative'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className='h-screen w-screen object-cover'>
         {/* image for temp use */}
        <img src="https://preview.redd.it/uber-doesnt-show-me-estimated-prices-and-hasnt-for-months-v0-2601fzw9tlwb1.jpg?width=640&crop=smart&auto=webp&s=ea3ac677b73a805880377ddd59b9e2e5fea5454a" alt="" />

        <div className='flex flex-col justify-end absolute h-screen top-0 w-full '>
          <div className='h-[30%] p-5 bg-white relative'>
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
          <div ref={panelRef} className='h-0 bg-red-500'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

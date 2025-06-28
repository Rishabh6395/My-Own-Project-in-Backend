import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/vehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState("")
  const [panelOpen, setPanelOpen] = useState(false)  
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePannel, setConfirmRidePannel] = useState(false)  

  const [vehicleFound, setVehicleFound] = useState(false)

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

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
      // height: '0%',
      transform: 'translateY(0)',
    })
    }
    else{
      gsap.to(vehiclePanelRef.current, {
      // height: '100%',
      transform: 'translateY(100%)',
    })
    }
  }, [vehiclePanel])

  useGSAP(function(){
    if(confirmRidePannel){
      gsap.to(confirmRidePanelRef.current, {
      transform: 'translateY(0)',
    })
    }
    else{
      gsap.to(confirmRidePanelRef.current, {
      transform: 'translateY(100%)',
    })
    }
  }, [confirmRidePannel])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, {
      transform: 'translateY(0)',
    })
    }
    else{
      gsap.to(vehicleFoundRef.current, {
      transform: 'translateY(100%)',
    })
    }
  }, [vehicleFound])

  return (
    <div className=' h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div  className='h-screen w-screen object-cover'>
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
            <LocationSearchPanel setPanelOpen={setPanelOpen}  setVehiclePanel={setVehiclePanel} />
          </div>
        </div>
      </div>

      <div  ref={vehiclePanelRef} className='fixed w-full translate-y-full p-3 py-10 pt-12 px-3 z-10 bottom-0 bg-white'>
        <VehiclePanel setConfirmRidePannel={setConfirmRidePannel} setVehiclePanel={setVehiclePanel}/>
      </div>
      <div  ref={confirmRidePanelRef} className='fixed w-full translate-y-full p-3 pt-12 py-6 px-3 z-10 bottom-0 bg-white'>
        <ConfirmRide setVehiclePanel={setVehiclePanel} setVehicleFound={setVehicleFound}
        setConfirmRidePannel={setConfirmRidePannel}/>
      </div>
      <div ref={vehicleFoundRef}  className='fixed w-full translate-y-full p-3 pt-12 py-6 px-3 z-10 bottom-0 bg-white'>
        <LookingForDriver/>
      </div>
    </div>
  )
}

export default Home

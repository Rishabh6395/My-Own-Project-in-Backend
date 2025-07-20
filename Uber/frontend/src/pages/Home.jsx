/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/vehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitForDriver from '../components/WaitForDriver'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState("")
  const [panelOpen, setPanelOpen] = useState(false)  
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePannel, setConfirmRidePannel] = useState(false)  
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, asetWaitingForDriver] = useState(false)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)

  // New state for suggestions and active field
  const [suggestions, setSuggestions] = useState([])
  const [activeField, setActiveField] = useState('') // 'pickup' or 'destination'

  const submitHandler = (e) => {
    e.preventDefault()
  }

  // Fetch suggestions from backend
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { address: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      setSuggestions([]);
    }
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
      transform: 'translateY(0)',
    })
    }
    else{
      gsap.to(vehiclePanelRef.current, {
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

  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current, {
      transform: 'translateY(0)',
    })
    }
    else{
      gsap.to(waitingForDriverRef.current, {
      transform: 'translateY(100%)',
    })
    }
  }, [waitingForDriver])

  async function findTrip(){
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination, vehicleType: 'auto' }, 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    // setFare(response.data.fare)
    console.log(response.data)
    setFare(response.data);
  }

  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data)
  }

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
                setActiveField('pickup')
                fetchSuggestions(pickup)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
                setActiveField('pickup')
                fetchSuggestions(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a pickup location'/>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
                fetchSuggestions(destination)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
                setActiveField('destination')
                fetchSuggestions(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg mt-3 w-full' type="text" placeholder='Enter your destination'/>
          </form>
          <button 
          onClick={() => {
            findTrip()
          }}
          className="bg-black text-white w-full py-3 rounded-lg mt-4 font-semibold">
            Find a Trip
          </button>
          </div>
          <div ref={panelRef} className='h-0 opacity-0 bg-white'>
            <LocationSearchPanel 
              setPanelOpen={setPanelOpen}  
              setVehiclePanel={setVehiclePanel}
              suggestions={suggestions}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        </div>
      </div>

      <div  ref={vehiclePanelRef} className='fixed w-full translate-y-full p-3 py-10 pt-12 px-3 z-10 bottom-0 bg-white'>
        <VehiclePanel
        selectVehicle={setVehicleType}
        fare={fare} setConfirmRidePannel={setConfirmRidePannel} setVehiclePanel={setVehiclePanel}/>
      </div>
      <div  ref={confirmRidePanelRef} className='fixed w-full translate-y-full p-3 pt-12 py-6 px-3 z-10 bottom-0 bg-white'>
        <ConfirmRide
        createRide={createRide}
        pickup={pickup} destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        setVehiclePanel={setVehiclePanel} setVehicleFound={setVehicleFound}
        setConfirmRidePannel={setConfirmRidePannel}/>
      </div>
      <div ref={vehicleFoundRef}  className='fixed w-full translate-y-full p-3 pt-12 py-6 px-3 z-10 bottom-0 bg-white'>
        <LookingForDriver 
        createRide={createRide}
        pickup={pickup} destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full  p-3 pt-12 py-6 px-3 z-10 bottom-0 bg-white'>
        <WaitForDriver waitingForDriver={waitingForDriver}/>
      </div>
    </div>
  )
}

export default Home

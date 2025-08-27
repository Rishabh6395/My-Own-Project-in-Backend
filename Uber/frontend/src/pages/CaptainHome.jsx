/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useEffect, useContext } from 'react'
import {SocketContext} from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [ConfirmRidePopUpPanel, setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const [ride, setRide] = useState({})

  const {socket} = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: "captain" });

    const updateLocation = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {

          // console.log( {userId: captain._id,
            
          //   location : { ltd: position.coords.latitude, lng: position.coords.longitude}
          // })

          socket.emit("update-location-captain",{
            userId: captain._id,
             location : { ltd: position.coords.latitude, lng: position.coords.longitude }
          })
        });
      }
    };

      const intervalId = setInterval(updateLocation, 5000);
      updateLocation();
      // return () => clearInterval(intervalId);
  }, [captain, socket]) 

  async function confirmRide(){
    
    // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, 
    //   {rideId: ride._id}, {
    //     captainId: captain._id}, 
        
    //     {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }) 

    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }

  // useEffect(() => {
  //   socket.on('ride-request', (data) => {
  //     console.log(data);
  //     setRide(data)
  //     setRidePopupPanel(true)
  //   })
  // })

  // socket.on('new-ride', (data) => {
  //   console.log(data);
  //   setRide(data)
  //   setRidePopupPanel(true)
  // })

  useEffect(() => {
  socket.on('new-ride', (data) => {
    console.log(data);
    setRide(data)
    setRidePopupPanel(true)
  })
}, [socket])


  useGSAP(function(){
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current, {
      transform: 'translateY(0)',
    })
    }
    else{
      gsap.to(ridePopupPanelRef.current, {
      transform: 'translateY(100%)',
    })
    }
  }, [ridePopupPanel])

  useGSAP(function(){
    if(ConfirmRidePopUpPanel){
      gsap.to(confirmRidePopupPanelRef.current, {
      transform: 'translateY(0)',
    })
    }
    else{
      gsap.to(confirmRidePopupPanelRef.current, {
      transform: 'translateY(100%)',
    })
    }
  }, [ConfirmRidePopUpPanel])




//   const location = useLocation()
    // const { ride } = location.state || {} 
  return (

  <div className="h-screen flex flex-col relative">
    {/* Top bar */}
    <div className="fixed p-3 top-0 mt-6 flex items-center justify-between w-screen z-20">
      <img
        className="w-16"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <Link
        to="/captain-home"
        className="fixed right-2 top-0 mt-6 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </Link>
    </div>

    {/* Map container (takes 3/5 height) */}
    <div className="h-3/5 relative z-0">
      <LiveTracking />
    </div>

    {/* Captain details + popups (takes 2/5 height) */}
    <div className="bg-white h-2/5 p-4 z-10 relative">
      <CaptainDetails />
    </div>

    {/* Ride popup panel */}
    <div
      ref={ridePopupPanelRef}
      className="fixed w-full translate-y-full p-3 py-10 pt-12 px-3 z-30 bottom-0 bg-white"
    >
      <RidePopup
        ride={ride}
        setRidePopupPanel={setRidePopupPanel}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        confirmRide={confirmRide}
      />
    </div>

    {/* Confirm ride popup */}
    <div
      ref={confirmRidePopupPanelRef}
      className="fixed w-full h-screen translate-y-full p-3 py-10 pt-12 px-3 z-30 bottom-0 bg-white"
    >
      <ConfirmRidePopUp
        ride={ride}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        setRidePopupPanel={setRidePopupPanel}
      />
    </div>
  </div>

  )
}

export default CaptainHome

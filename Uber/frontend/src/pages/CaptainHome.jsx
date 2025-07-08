/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [ConfirmRidePopUpPanel, setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

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
                  <div ref={ridePopupPanelRef} className='fixed w-full translate-y-full p-3 py-10 pt-12 px-3 z-10 bottom-0 bg-white'>
                    <RidePopup setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
                  </div>
                  <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen translate-y-full p-3 py-10 pt-12 px-3 z-10 bottom-0 bg-white'>
                    <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
                  </div>
            </div>
        </div>
  )
}

export default CaptainHome

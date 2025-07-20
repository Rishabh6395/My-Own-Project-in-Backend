import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center  w-[94%] absolute top-0' onClick={() => {props.setVehiclePanel(false)
        props.setConfirmRidePannel(true)
      }}><i className="text-3x l text-gray-400 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div onClick={() => {props.setVehiclePanel(true) 
          props.selectVehicle('car')
          props.setConfirmRidePannel(true)
        }} className='flex border-2 mb-2 active:border-black  rounded-xl p-3 w-full items-center justify-beween'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="" />
          <div className='ml-4 w-1/2'>
            <h4 className='text-base font-medium'>Uber Go <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='text-sm font-medium'>2 mins away</h5>
            <p className='text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
        <h2 className='text-lg pl-6 font-semibold'>₹{props.fare.car}</h2>
        </div>
        <div onClick={() => {props.setVehiclePanel(true)
          props.selectVehicle('moto')
          props.setConfirmRidePannel(true)
        }} className='flex border-2 mb-2 active:border-black  rounded-xl p-3 w-full items-center justify-beween'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className='ml-4 w-1/2'>
            <h4 className='text-base font-medium'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='text-sm font-medium'>3 mins away</h5>
            <p className='text-xs text-gray-600'>Affordable, moto rides</p>
          </div>
        <h2 className='text-lg pl-6 font-semibold'>₹{props.fare.moto}</h2>
        </div>
        <div onClick={() => {props.setVehiclePanel(true)
          props.selectVehicle('auto')
          props.setConfirmRidePannel(true)
        }}  className='flex border-2 mb-2 active:border-black  rounded-xl p-3 w-full items-center justify-beween'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className='ml-4 w-1/2'>
            <h4 className='text-base font-medium'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className='text-sm font-medium'>3 mins away</h5>
            <p className='text-xs text-gray-600'>Affordable, Auto rides</p>
          </div>
        <h2 className='text-lg pl-6 font-semibold'>₹{props.fare.auto}</h2>
        </div>
    </div>
  )
}

export default VehiclePanel

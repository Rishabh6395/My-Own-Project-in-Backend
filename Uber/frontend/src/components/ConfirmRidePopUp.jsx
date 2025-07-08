import React from 'react'

const ConfirmRidePopUp = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center  w-[94%] absolute top-0' onClick={() => props.setRidePopupPanel(false)}><i className="text-3x l text-gray-400 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
            <img className='h-12 w-12 object-cover rounded-full' src="https://img.freepik.com/free-photo/portrait-man-looking-front-him_23-2148422271.jpg?semt=ais_hybrid&w=740" alt="" />
            <h2 className='text-lg font-medium'>Harsh Patel</h2>

        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>

      <div className='flex gap-2 mt-4 justify-between flex-col items-center'>
        {/* <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="" /> */}
        <div className='w-full'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-line"></i>
            <div>
              <h3 className='font-semibold text-lg'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Pune</p>
            </div>
          </div>
          <div  className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
                <h3 className='font-semibold text-lg'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Pune</p>
              </div>
            </div>
            <div  className='flex items-center gap-5 p-3'>
              <i className="ri-currency-line"></i>
              <div>
                  <h3 className='font-semibold text-lg'>$20.4</h3>
                  <p className='text-sm -mt-1 text-gray-600'>Cash</p>
              </div>
            </div>
        </div>
        <button 
        onClick={() => {

        }}
        className='w-full mt-5 bg-green-600 text-white font-semibold p-2  rounded-lg'>Confirm</button>
        <button 
        onClick={() => {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
        }}
        className='w-full mt-1 bg-red-500 text-white font-semibold p-2  rounded-lg'>Cancel</button>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp

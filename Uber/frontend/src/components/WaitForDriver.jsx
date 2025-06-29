import React from 'react'

const WaitForDriver = (props) => {
  return (
     <div>
      <h5 className='p-1 text-center  w-[94%] absolute top-0' onClick={() => props.setVehiclePanel(false)}><i className="text-3x l text-gray-400 ri-arrow-down-wide-line"></i></h5>
      <div className='flex items-center justify-between gap-5 p-3 border-b-2'>
        <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="" />
        <div className='text-right'>
          <h2 className='font-semibold text-lg'>Rishabh</h2>
          <h4 className='font-semibold -mt-1 -mb-1 text-xl'>MP04 AB 1244</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki</p>
        </div>
      </div>
      <div className='flex gap-2 justify-between flex-col items-center'>
        
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
        
      </div>
    </div>
  )
}

export default WaitForDriver

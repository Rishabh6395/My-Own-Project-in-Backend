import React from 'react'
import { useContext } from 'react'
import  { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)
    console.log(captain)

  return (
    <div>
      <div className='flex  items-center justify-between'>
                        <div className='flex items-center justify-start gap-3'>
                            <img className='h-10 w-10 rounded-full object-cover' src="https://i.redd.it/random-guy-v0-wfe9xhtnweod1.jpg?width=2316&format=pjpg&auto=webp&s=2d6f55360e7571bcc180aed4ca1ff4939d4603e9" alt="" />
                            <h4 className='text-lg font-medium'>{captain.fullname.firstName}</h4>
                        </div>
                        <div>
                            <h4 className='text-xl font-semibold'>$278</h4>
                            <p className='text-sm text-gray-500'>Earned</p>
                        </div>
                    </div>
                    <div className='flex p-3 bg-gray-100 rounded-full justify-center gap-5 items-start'>
                        <div className='text-center'>
                            <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
                            <h5 className='text-lg font-medium'>10.2</h5>
                            <p className='text-sm text-gray-600'>Hours Online</p>
                        </div>
                        <div className='text-center'>
                            <i className='text-3xl mb-2 font-thin ri-speed-up-line'></i>
                            <h5 className='text-lg font-medium'>10.2</h5>
                            <p className='text-sm text-gray-600'>Hours Online</p>
                        </div>
                        <div className='text-center'>
                            <i className='text-3xl mb-2 font-thin ri-booklet-line'></i>
                            <h5 className='text-lg font-medium'>10.2</h5>
                            <p className='text-sm text-gray-600'>Hours Online</p>
                        </div>
                    </div>
    </div>
  )
}

export default CaptainDetails

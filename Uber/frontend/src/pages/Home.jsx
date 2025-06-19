import React from 'react'

const Home = () => {
  return (
    <div className=' h-screen relative'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className='h-screen w-screen object-cover'>
         {/* image for temp use */}
        <img src="https://preview.redd.it/uber-doesnt-show-me-estimated-prices-and-hasnt-for-months-v0-2601fzw9tlwb1.jpg?width=640&crop=smart&auto=webp&s=ea3ac677b73a805880377ddd59b9e2e5fea5454a" alt="" />

        <div className='flex flex-col justify-end absolute h-screen top-0 w-full '>
          <div className='h-[30%] p-5 bg-white'>
            <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form>
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pickup location'/>
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg mt-3 w-full' type="text" placeholder='Enter your destination'/>
          </form>
          </div>
          <div className='h-0 bg-red-500'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

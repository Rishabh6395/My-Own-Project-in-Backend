import React from 'react'

const LocationSearchPanel = (props) => {


  // sample array for location
  const location =  ["24B, Near Kappor's cafe, Sheriyans Coding School, Bhopal", "32B, Near Malhotra's cafe, Sheriyans Coding School, Bhopal", "18B, Near lol's cafe, Sheriyans Coding School, Bhopal"]

  return (
    <div>
      {/* // This is just a sample data */}
      {
        location.map(function(elem,idx){
          return (
            <div key={idx} onClick={() => {
                props.setVehiclePanel(true)
                props.setPanelOpen(false)
              } 
            } 
            className='flex items-center border-2 p-3 rounded-xl my-2 border-gray-50 active:border-black gap-4 justify-start'>
            <h2 className='bg-[#eee] rounded-full h-8 w-12 flex items-center justify-center'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
        </div>
          )
        })
      }
        
        
    </div>
  )
}

export default LocationSearchPanel

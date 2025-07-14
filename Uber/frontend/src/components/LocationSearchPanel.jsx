import React from 'react'

const LocationSearchPanel = (props) => {
  // Use suggestions from props
  const { suggestions = [], setPanelOpen, setVehiclePanel, setPickup, setDestination, activeField } = props

  return (
    <div>
      {suggestions.length === 0 && (
        <div className='text-gray-400 text-center py-4'>No suggestions found</div>
      )}
      {suggestions.map(function(elem, idx){
        return (
          <div key={idx} onClick={() => {
              if (activeField === 'pickup') {
                setPickup(elem)
              } else if (activeField === 'destination') {
                setDestination(elem)
              }
              setPanelOpen(false)
              setVehiclePanel(true)
            }} 
            className='flex items-center border-2 p-3 rounded-xl my-2 border-gray-50 active:border-black gap-4 justify-start'>
            <h2 className='bg-[#eee] rounded-full h-8 w-12 flex items-center justify-center'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
        </div>
        )
      })}
    </div>
  )
}

export default LocationSearchPanel

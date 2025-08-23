import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'

const Riding = (props) => {
    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data

    // Debug logs to see what data we have
    useEffect(() => {
        // console.log('🔍 Riding page debug:');
        // console.log('location.state:', location.state);
        // console.log('ride data:', ride);
        // console.log('ride stringified:', JSON.stringify(ride, null, 2));
        
        if (ride) {
            console.log('ride.captain:', ride.captain);
            console.log('ride.captain type:', typeof ride.captain);
            console.log('Has captain data:', !!ride.captain);
            
            if (ride.captain) {
                console.log('captain.fullname:', ride.captain.fullname);
                console.log('captain.vehicle:', ride.captain.vehicle);
            }
        }
    }, [ride, location.state]);

    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                {/* <LiveTracking /> */}
            </div>
            <div className='h-1/2 p-4'>
                {/* Debug Info Display */}
                {/* <div className='mb-4 p-2 bg-gray-100 rounded text-xs'>
                    <p><strong>Debug Info:</strong></p>
                    <p>Has ride data: {ride ? 'Yes' : 'No'}</p>
                    <p>Has captain data: {ride?.captain ? 'Yes' : 'No'}</p>
                    <p>Captain ID: {ride?.captain?._id || 'Not found'}</p>
                    <p>Ride Status: {ride?.status || 'Unknown'}</p>
                </div> */}

                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>
                            {ride?.captain?.fullname?.firstname || 'Captain name not available'}
                        </h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>
                            {ride?.captain?.vehicle?.plate || 'Plate not available'}
                        </h4>
                        <p className='text-sm text-gray-600'>
                            {ride?.captain?.vehicle?.vehicleType || 'Vehicle type not available'}
                        </p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare || 'N/A'}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding
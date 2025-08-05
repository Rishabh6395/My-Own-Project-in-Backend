const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.results.length > 0) {
            const location = response.data.results[0].geometry;
            return { latitude: location.lat, longitude: location.lng };
        } else {
            console.error('No results found:', response.data);
            throw new Error('Failed to fetch coordinates: ' + response.data.error_message);
        }
    } 
    // catch (error) {
    //     console.error('API error:', error.response ? error.response.data : error.message);
        
    //     // Return readable message even if error.message is undefined
    //     throw new Error(
    //         'Failed to fetch coordinates: ' + 
    //         (error.response?.data?.status?.message || error.message || 'Unknown error')
    //     );
    // }
    catch (error) {
        throw new Error('Failed to fetch coordinates: ' + error.message);
    }
};

// module.exports.getDistanceTime = async (origin, destination) => {
//     if(!origin || !destination){
//         throw new Error("All fields are required");
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data && response.data.rows.length > 0) {
//             const distance = response.data.rows[0].elements[0].distance.text;
//             const duration = response.data.rows[0].elements[0].duration.text;
//             return { distance, duration };
//         } else {
//             console.error('No results found:', response.data);
//             throw new Error('Failed to fetch distance and time: ' + response.data.error_message);
//         }
//     } catch (error) {
//         throw new Error('Failed to fetch distance and time: ' + error.message);
//     }
// }
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("All fields are required");
    }

    const apiKey = process.env.OPEN_ROUTE_API;

    try {
        // Step 1: Convert origin address to coordinates
        const geocode = async (place) => {
            const geoUrl = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(place)}&size=1`;
            const response = await axios.get(geoUrl);
            if (response.data.features.length === 0) {
                throw new Error(`No coordinates found for: ${place}`);
            }
            return response.data.features[0].geometry.coordinates; // [lng, lat]
        };

        const originCoords = await geocode(origin);
        const destinationCoords = await geocode(destination);

        // Step 2: Call directions API
        const directionsUrl = `https://api.openrouteservice.org/v2/directions/driving-car`;
        const body = {
            coordinates: [originCoords, destinationCoords]
        };

        const routeResponse = await axios.post(directionsUrl, body, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });

        const route = routeResponse.data.routes[0];
        const distanceKm = (route.summary.distance / 1000).toFixed(2) + ' km';
        const durationMin = Math.round(route.summary.duration / 60) + ' mins';

        return {
            distance: distanceKm,
            duration: durationMin
        };

    } catch (error) {
        console.error('Route error:', error.response?.data || error.message);
        throw new Error('Failed to fetch distance and time: ' + (error.response?.data?.error || error.message));
    }
};

// module.exports.getSuggestions = async (address) => {
//     if(!address){
//         throw new Error("All fields are required");
//     }

//     const apiKey = process.env.OPEN_ROUTE_API;
//     const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}&size=5`;

//     try {
//         const response = await axios.get(url);
//         if (response.data && response.data.features.length > 0) {
//             const suggestions = response.data.features.map(feature => feature.place_name);
//             return suggestions;
//         } else {
//             console.error('No results found:', response.data);
//             throw new Error('Failed to fetch suggestions: ' + response.data.error_message);
//         }
//     } catch (error) {
//         throw new Error('Failed to fetch suggestions: ' + error.message);
//     }
// }

module.exports.getSuggestions = async (address) => {
    if (!address) {
        throw new Error("All fields are required");
    }

    const apiKey = process.env.OPEN_ROUTE_API;
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}&size=5`;

    try {
        const response = await axios.get(url);

        if (response.data && response.data.features.length > 0) {
            const suggestions = response.data.features.map(feature => feature.properties.label);
            return suggestions;
        } else {
            console.error('No results found:', response.data);
            throw new Error('No suggestions found for the given address.');
        }
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw new Error('Failed to fetch suggestions: ' + (error.response?.data?.error || error.message));
    }
};


module.exports.getCaptainInTheRaidius = async (lat, lng, radius) => {

    // radius in km


    // const captains = await captainModel.find({
    //     location: {
    //         $geoWithin: {
    //             $centerSphere: [ [ lng, ltd ], radius / 6371 ]
    //         }
    //     }
    // });

    // return captains;


    try {
        console.log(`\n=== GEOSPATIAL QUERY DEBUG ===`);
        console.log(`🎯 Search center: lat=${lat}, lng=${lng}, radius=${radius}km`);
        
        // First check: Do we have ANY captains in the database?
        const totalCaptains = await captainModel.countDocuments({});
        console.log(`📊 Total captains in database: ${totalCaptains}`);
        
        if (totalCaptains === 0) {
            console.log('❌ No captains found in database at all!');
            return [];
        }
        
        // Second check: Show all captains regardless of location
        const allCaptains = await captainModel.find({});
        console.log(`📋 All captains details:`);
        allCaptains.forEach((captain, index) => {
            console.log(`   Captain ${index + 1}: ${captain.fullname?.firstname} - ${captain.email}`);
            console.log(`   Status: ${captain.status}`);
            console.log(`   Location:`, captain.location);
            console.log(`   Coordinates:`, captain.location?.coordinates);
        });
        
        // Third check: Find captains with any location data
        const captainsWithLocation = await captainModel.find({
            'location.coordinates': { $exists: true }
        });
        console.log(`📍 Captains with location field: ${captainsWithLocation.length}`);
        
        // Fourth check: Find captains with non-zero coordinates
        const captainsWithValidLocation = await captainModel.find({
            'location.coordinates.0': { $ne: 0 },
            'location.coordinates.1': { $ne: 0 }
        });
        console.log(`✅ Captains with valid coordinates: ${captainsWithValidLocation.length}`);
        
        // Fifth check: Try geospatial query WITHOUT any filters
        console.log(`🔍 Attempting geospatial query...`);
        const nearbyAny = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [ [ lng, lat ], radius / 6371 ]
                }
            }
        });
        console.log(`📍 Captains found by geospatial query (any status): ${nearbyAny.length}`);
        
        // If geospatial query fails, try distance calculation manually
        if (nearbyAny.length === 0 && captainsWithValidLocation.length > 0) {
            console.log(`🔧 Geospatial query failed, trying manual distance calculation...`);
            
            const captainsWithDistance = [];
            for (const captain of captainsWithValidLocation) {
                const [captainLng, captainLat] = captain.location.coordinates;
                const distance = calculateDistance(lat, lng, captainLat, captainLng);
                console.log(`   ${captain.fullname?.firstname}: ${distance.toFixed(2)}km away`);
                
                if (distance <= radius) {
                    captainsWithDistance.push(captain);
                }
            }
            
            console.log(`📍 Captains within ${radius}km (manual calculation): ${captainsWithDistance.length}`);
            console.log(`=== END GEOSPATIAL DEBUG ===\n`);
            return captainsWithDistance;
        }
        
        console.log(`=== END GEOSPATIAL DEBUG ===\n`);
        return nearbyAny;

    } catch (error) {
        console.error('❌ Error in getCaptainInTheRaidius:', error);
        throw error;
    }


}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}
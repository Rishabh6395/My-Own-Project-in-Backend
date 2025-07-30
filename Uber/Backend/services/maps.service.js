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


module.exports.getCaptainInTheRaidius = async (ltd, lng, radius) => {

    // raidus in km
    

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], radius / 6378.1]
            }
        }
    })

    return captains
}
const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return { latitude: location.lat, longitude: location.lng };
        } else {
            throw new Error('Failed to fetch coordinates: ' + response.data.error_message);
        }
    } catch (error) {
        throw new Error('Failed to fetch coordinates: ' + error.message);
    }
};
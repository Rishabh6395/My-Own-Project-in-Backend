const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");


module.exports.getCoordiates = async (req, res, next) => {
    const { address } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try{
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

module.exports.getDistanceTime = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;
        const distanceTime = await mapsService.getDistanceTime(origin, destination);
        if(distanceTime){
            res.status(200).json(distanceTime);
        }        
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: error.message });
    }
}

module.exports.getSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { address } = req.query;
        const suggestions = await mapsService.getSuggestions(address);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: error.message });
    }
}

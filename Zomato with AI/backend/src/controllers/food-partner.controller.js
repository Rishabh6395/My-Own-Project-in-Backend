const foodPatnerController = require('../controllers/food-partner.controller');

async function getFoodPartnerById(req, res) {
    const foodpartnerId = req.params.id;

    const foodpartner = await foddPartnerModel.findById(foodpartnerId);

    if(!foodpartner) {
        return res.status(404).json({message: "Food partner not found"});
    }
    
    res.status(200).json({message: "Food partner fetched", foodpartner});
}

module.exports = getFoodPartnerById;
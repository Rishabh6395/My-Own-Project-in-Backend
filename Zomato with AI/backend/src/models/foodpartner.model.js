const mongoose = require('mongoose');

const foodPartnerSchma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactName:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const foodPartnerSchmaModel = mongoose.model('foodpartner', foodPartnerSchma);
module.exports = foodPartnerSchmaModel;
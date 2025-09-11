const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video:{
        type: String,
        reqired: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    foodpartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartner'
    }
});

const foodSchemaModel = mongoose.model('food', foodSchema);
module.exports = foodSchemaModel;
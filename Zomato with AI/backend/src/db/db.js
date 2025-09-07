const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect('mongodb://127.0.0.1:27017/food-view')
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = connectDB;
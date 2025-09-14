const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const {v4: uuid} = require("uuid")

async function createFood(req, res) {


    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        price: req.body.price,
        image: fileUploadResult.url,
        category: req.body.category,
        foodpartner: req.foodpartner._id
    })

    res.status(201).json({
        message: "Food item created",
        food: foodItem
    });
}

async function getAllFoods(req, res) {
    const foodsItem = await foodModel.find({});
    res.status(200).json({message: "Foods fetched", foodsItem});
}

module.exports = {
    createFood,
    getAllFoods
}
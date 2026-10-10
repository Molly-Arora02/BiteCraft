const Food = require("../models/Fooditem.js");

const foodController = {
    getFoods: async (req, res) => {
        const foods = await Food.find();
        res.json(foods);
    },
    getFoodById: async (req, res) => {
        res.status(501).json({ message: "Not implemented" });
    },
    createFood: async (req, res) => {
        res.status(501).json({ message: "Not implemented" });
    },
    updateFood: async (req, res) => {
        res.status(501).json({ message: "Not implemented" });
    },
    deleteFood: async (req, res) => {
        res.status(501).json({ message: "Not implemented" });
    }
};

module.exports = foodController;
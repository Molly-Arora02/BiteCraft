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
        try {
            const {
                name,
                category,
                price,
                description,
                available,
                image
            } = req.body;

            if (!name || !category || price === undefined) {
                return res.status(400).json({
                    message: "Name, category and price are required"
                });
            }

            if (
                typeof name !== "string" ||
                typeof category !== "string" ||
                typeof price !== "number" ||
                price < 0 ||
                (available !== undefined && typeof available !== "boolean")
            ) {
                return res.status(400).json({
                    message: "Invalid food details"
                });
            }

            const food = await Food.create({
                name,
                category,
                price,
                description,
                available,
                image
            });

            return res.status(201).json(food);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Failed to create food"
            });
        }
    },
    updateFood: async (req, res) => {
        res.status(501).json({ message: "Not implemented" });
    },
    deleteFood: async (req, res) => {
        res.status(501).json({ message: "Not implemented" });
    }
};

module.exports = foodController;
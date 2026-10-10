
const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  available: Boolean,
  image: String
});

module.exports = mongoose.model("FoodItem", foodItemSchema);

const { required } = require("joi");
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  mealid:{type:String,  required: true},
  title: { type: String, required: true },
  cuisine: { type: String, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String }, // Add image field
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

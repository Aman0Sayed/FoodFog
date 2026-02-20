const mongoose = require('mongoose');

const userRecipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "" },
  time: { type: String, default: "" },
  servings: { type: Number, default: 1 },
  rating: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
  ingredients: { type: [String], default: [] },
  nutrition: {
    calories: { type: String, default: "" },
    protein: { type: String, default: "" },
    carbs: { type: String, default: "" },
    fat: { type: String, default: "" },
    fiber: { type: String, default: "" },
    sodium: { type: String, default: "" },
  },
  instructions: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserRecipe', userRecipeSchema, 'cr');

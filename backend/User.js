const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  bio: { type: String, default: "" },
  role: { type: String, default: "Home Chef" },
  country: { type: String, default: "" },
  recipes: [
    {
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
    }
  ],
  favorites: { type: [Object], default: [] }
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: String, required: true },
  mealType: { type: String, required: true },
  recipe: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'calendar' }); // Use 'calendar' collection in 'test' db

module.exports = mongoose.model('Meal', mealSchema);

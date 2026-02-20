const express = require('express');
const router = express.Router();
const User = require('./User');
const mongoose = require('mongoose');

// Save favorite recipes for a user
router.post('/favorites', async (req, res) => {
  const { username, recipe } = req.body;
  if (!username || !recipe) return res.status(400).json({ error: 'Missing username or recipe' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Avoid duplicates
    if (user.favorites && user.favorites.some(r => r.id === recipe.id)) {
      return res.status(200).json({ message: 'Already in favorites' });
    }
    if (!user.favorites) user.favorites = [];
    user.favorites.push(recipe);
    await user.save();
    res.status(200).json({ message: 'Favorite saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove favorite recipe for a user
router.delete('/favorites', async (req, res) => {
  const { username, recipeId } = req.body;
  if (!username || recipeId === undefined) return res.status(400).json({ error: 'Missing username or recipeId' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.favorites = (user.favorites || []).filter(r => r.id !== recipeId);
    await user.save();
    res.status(200).json({ message: 'Favorite removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get favorite recipes for a user
router.get('/favorites', async (req, res) => {
  const username = req.headers['x-username'];
  if (!username) return res.status(400).json({ error: 'Missing username' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user.favorites || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

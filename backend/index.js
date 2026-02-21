const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
// Load environment variables from .env when present (local development)
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS for Vercel and local development
const allowedOrigins = [
  'https://food-fog.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  // Allow custom headers used by the frontend (case-insensitive)
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-Username',
    'x-username',
    'Origin',
    'Accept'
  ],
  // Expose headers if frontend needs to read them
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision']
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(bodyParser.json());


// MongoDB connection - use environment variable
// Required env: MONGODB_URI
if (!process.env.MONGODB_URI) {
  console.error('\nERROR: MONGODB_URI is not set.');
  console.error('Set MONGODB_URI in your environment or create a .env file in the backend folder with:');
  console.error('MONGODB_URI="mongodb+srv://<user>:<pass>@cluster0.mongodb.net/dbname?retryWrites=true&w=majority"\n');
  // Exit to avoid running the server without a database connection
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    // If connection fails, exit to let deploy/platform know
    process.exit(1);
  });

// User model
const User = require('./User');
// Meal model
const Meal = require('./Meal');
// UserRecipe model
const UserRecipe = require('./UserRecipe'); // NEW: user-created recipes collection
const favoritesRouter = require('./favorites');

// startup

// Register route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    res.json({ message: 'Login successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Middleware to get user from username (for demo, not secure for production)
async function getUserId(req, res, next) {
  const username = req.headers["x-username"];
  if (!username) return res.status(401).json({ message: "No username header" });
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "User not found" });
  req.userId = user._id;
  next();
}

// Save meal for a user
app.post('/api/meals', getUserId, async (req, res) => {
  const { day, mealType, recipe } = req.body;
  if (!day || !mealType || !recipe) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  try {
    // Upsert: update if exists, insert if not
    await Meal.findOneAndUpdate(
      { userId: req.userId, day, mealType },
      { $set: { recipe, createdAt: new Date() } },
      { upsert: true, new: true }
    );
    res.status(201).json({ message: 'Meal saved.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all meals for a user
app.get('/api/meals', getUserId, async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.userId });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Remove meal for a user
app.delete('/api/meals', getUserId, async (req, res) => {
  const { day, mealType } = req.body;
  if (!day || !mealType) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  try {
    await Meal.findOneAndDelete({ userId: req.userId, day, mealType });
    res.status(200).json({ message: 'Meal removed.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get user profile (username, bio, role, country)
app.get('/api/profile', getUserId, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('username bio role country');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update user bio, role, and country
app.post('/api/profile', getUserId, async (req, res) => {
  const { bio, role, country } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { bio: bio || "", role: role || "Home Chef", country: country || "" } },
      { new: true }
    ).select('username bio role country');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Delete user account
app.post('/api/delete-account', getUserId, async (req, res) => {
  try {
    // Remove all meals for this user
    await Meal.deleteMany({ userId: req.userId });
    // Remove user
    await User.findByIdAndDelete(req.userId);
    res.json({ message: 'Account deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all recipes for the logged-in user
app.get('/api/your-recipes', getUserId, async (req, res) => {
  try {
    // Fetch from the new collection, filter by userId
    const recipes = await UserRecipe.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Add a new recipe for the logged-in user
app.post('/api/your-recipes', getUserId, async (req, res) => {
  // Accept all possible fields from the frontend
  const {
    title,
    description,
    image = "",
    time = "",
    servings = 1,
    rating = 0,
    tags = [],
    ingredients = [],
    nutrition = {},
    instructions = []
  } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }
  try {
    // Ensure all fields are non-empty if possible
    const safeRating = typeof rating === 'number' ? rating : 0;
    const safeTags = Array.isArray(tags) ? tags : [];
    const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
    const safeInstructions = Array.isArray(instructions) ? instructions : [];
    // Nutrition: ensure all keys exist and are strings
    const safeNutrition = {
      calories: nutrition?.calories || "",
      protein: nutrition?.protein || "",
      carbs: nutrition?.carbs || "",
      fat: nutrition?.fat || "",
      fiber: nutrition?.fiber || "",
      sodium: nutrition?.sodium || ""
    };
    const newRecipe = new UserRecipe({
      userId: req.userId,
      title,
      description,
      image,
      time,
      servings,
      rating: safeRating,
      tags: safeTags,
      ingredients: safeIngredients,
      nutrition: safeNutrition,
      instructions: safeInstructions,
      createdAt: new Date()
    });
    await newRecipe.save();
    const recipes = await UserRecipe.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(201).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Delete a user recipe by ID
app.delete('/api/your-recipes/:id', getUserId, async (req, res) => {
  try {
    const recipeId = req.params.id;
    // Only allow deletion if the recipe belongs to the user
    const deleted = await UserRecipe.findOneAndDelete({ _id: recipeId, userId: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Recipe not found or not authorized.' });
    res.json({ message: 'Recipe deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update a user recipe by ID
app.put('/api/your-recipes/:id', getUserId, async (req, res) => {
  try {
    const recipeId = req.params.id;
    // Only allow update if the recipe belongs to the user
    const updated = await UserRecipe.findOneAndUpdate(
      { _id: recipeId, userId: req.userId },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Recipe not found or not authorized.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all users for explore accounts
app.get('/api/all-users', async (req, res) => {
  try {
    const users = await User.find({}, 'username bio role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get public profile by username (for explore detail)
app.get('/api/public-profile', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ message: 'Missing username' });
  try {
    const user = await User.findOne({ username }, 'username bio role country');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all recipes created by a given username (for explore detail)
app.get('/api/recipes-by-user', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ message: 'Missing username' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const recipes = await UserRecipe.find({ userId: user._id }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get any recipe by ID (public, for explore detail view)
app.get('/api/recipe/:id', async (req, res) => {
  try {
    const recipe = await UserRecipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Example route
app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/api', favoritesRouter);

// Only start listening when this file is run directly (not when required by serverless)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for serverless platforms or testing
module.exports = app;

// Global error handlers to capture unexpected crashes and log stack traces
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

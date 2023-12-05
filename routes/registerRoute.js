// routes/registerRoute.js
const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    // Create a new user using the User model
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({ message: 'Error in user registration' });
  }
});

module.exports = router;

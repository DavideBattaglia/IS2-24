// routes/registerRoute.js
const bcrypt = require('bcryptjs');
const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({ message: 'Error in user registration' });
  }
});

module.exports = router;

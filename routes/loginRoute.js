// routes/loginRoute.js
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const tokenChecker = require('../middleware/tokenChecker');
const User = require('../models/user');

const router = express.Router();
const secretKey = process.env.SECRET_KEY || 'defaultSecretKey';

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Search for the user in the database
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token and send it as a response
    const token = jwt.sign({ username: user.username }, secretKey);
    res.json({ token });
    
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error in login' });
  }
});

module.exports = router;

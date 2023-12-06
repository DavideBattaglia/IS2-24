// routes/shoeRoute.js
const express = require('express');
const router = express.Router();
const Shoe = require('../models/shoe');
const tokenChecker = require('../middleware/tokenChecker'); // Assicurati di importare il middleware corretto

// Rotta per visualizzare tutte le scarpe (protetta dal tokenChecker)
router.get('/', tokenChecker, async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.json(shoes);
    console.log('scarperrr');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

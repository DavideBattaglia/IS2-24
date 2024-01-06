// routes/shoeRoute.js
const express = require('express');
const router = express.Router();
const Shoe = require('../models/shoe');
const tokenChecker = require('../middleware/tokenChecker');

// Rotta per visualizzare tutte le scarpe (protetta dal tokenChecker)
router.get('/', tokenChecker, async (req, res) => {
  try {
    const shoes = await Shoe.find();

    if (!shoes || shoes.length === 0) {
      return res.status(404).json({ message: 'Nessuna scarpa trovata' });
    }

    res.json(shoes);
    console.log('Scarpe protette');
  } catch (error) {
    console.error('Errore nella visualizzazione delle scarpe:', error.message);
    res.status(500).json({ message: 'Errore nella visualizzazione delle scarpe' });
  }
});

module.exports = router;

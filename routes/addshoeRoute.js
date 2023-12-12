// addshoe.js
const express = require('express');
const router = express.Router();
const Shoe = require('../models/shoe');
const tokenChecker = require('../middleware/tokenChecker'); // Assicurati di importare il middleware corretto

// Definisci la rotta per aggiungere una scarpa (protetta dal tokenChecker)
router.post('/', tokenChecker, async (req, res) => {
  try {
    const { brand, model, description, price } = req.body;

    // Crea una nuova istanza di Shoe
    const newShoe = new Shoe({
      brand,
      model,
      description,
      price,
    });

    // Salva la scarpa nel database
    const savedShoe = await newShoe.save();

    res.status(201).json(savedShoe); // Ritorna la scarpa appena inserita
  } catch (error) {
    console.error('Errore durante l\'aggiunta della scarpa:', error);
    res.status(500).send('Errore del server');
  }
});

module.exports = router;

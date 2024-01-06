// routes/updateShoeRoute.js
const express = require('express');
const router = express.Router();
const Shoe = require('../models/shoe');
const tokenChecker = require('../middleware/tokenChecker');

// Rotta protetta per aggiornare una scarpa
router.put('/:shoeId', tokenChecker, async (req, res) => {
  console.log('update Protetta');

  try {
    // Aggiungi validazione dei dati se necessario
    const updatedShoe = await Shoe.findByIdAndUpdate(req.params.shoeId, req.body, { new: true });

    if (!updatedShoe) {
      return res.status(404).json({ message: 'Scarpa non trovata' });
    }

    res.status(200).json({ message: 'Scarpa aggiornata con successo', updatedShoe });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento della scarpa:', error);
    res.status(500).json({ message: 'Errore durante l\'aggiornamento della scarpa', error: error.message });
  }
});

module.exports = router;

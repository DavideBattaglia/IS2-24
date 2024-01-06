// routes/deleteShoe.js
const express = require('express');
const router = express.Router();
const Shoe = require('../models/shoe');
const tokenChecker = require('../middleware/tokenChecker');

// Rotta protetta per eliminare una scarpa
router.delete('/:shoeId', tokenChecker, async (req, res) => {
  console.log('DELETE Protetta');
  
  try {
    const deletedShoe = await Shoe.findOneAndDelete({ _id: req.params.shoeId });
    
    if (!deletedShoe) {
      return res.status(404).json({ message: 'Scarpa non trovata' });
    }

    res.json({ message: 'Scarpa eliminata con successo', deletedShoe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

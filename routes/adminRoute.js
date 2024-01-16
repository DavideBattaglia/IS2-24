
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const tokenChecker = require('../middleware/tokenChecker');
const isAdmin = require('../middleware/isAdmin'); // Importa il middleware isAdmin

// Rotta per visualizzare tutti gli utenti (protetta dal tokenChecker e isAdmin)
router.get('/', tokenChecker,isAdmin, async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Nessun utente trovato' });
    }

    // Log specifico per ottenere solo le informazioni desiderate
    console.log('Utenti protetti:', users);

    res.status(200).json(users);
    console.log('Utenti protetti');
  } catch (error) {
    console.error('Errore nella visualizzazione degli utenti:', error.message);
    res.status(500).json({ message: 'Errore nella visualizzazione degli utenti' });
  }
});

module.exports = router;

// protectedRoute.js
const express = require('express');
const router = express.Router();
const tokenChecker = require('../middleware/tokenChecker');

// Esempio di una route protetta che utilizza il middleware tokenChecker
router.get('/', tokenChecker, (req, res) => {
  res.render('protected', { user: req.loggedUser });
});

// Aggiungi altre route protette se necessario...

module.exports = router;

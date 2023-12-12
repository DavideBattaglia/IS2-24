
// modificaRoute.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Definisci la rotta per la pagina di aggiornamento
router.get('/:shoeId', (req, res) => {
    console.log('Modifica Libera');
    // Invia la pagina di aggiornamento (modifica.ejs) e passa l'ID della scarpa come parametro
    res.render('modifica', { shoeId: req.params.shoeId });
});

// Altri percorsi e logiche per l'aggiornamento delle scarpe potrebbero andare qui...

module.exports = router;
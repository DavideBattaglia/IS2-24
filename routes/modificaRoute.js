const express = require('express');
const router = express.Router();
const path = require('path');

// Definisci la rotta per la pagina di aggiornamento
router.get('/:shoeId', (req, res) => {
  try {
    // Simula una logica di recupero della scarpa dal database
    const shoeId = req.params.shoeId;
    console.log('[modificaRoute.js] shoeId:',shoeId);
    if (!shoeId) {
      // Se l'ID della scarpa non è fornito, restituisci uno stato 400 Bad Request
      return res.status(400).json({ message: 'ID della scarpa non fornito' });
    }

    // Simula il recupero della scarpa dal database
    const shoe = { id: shoeId, brand: 'Nike', model: 'Air Max' };

    // Verifica se la scarpa è stata trovata
    if (!shoe) {
      // Se la scarpa non è trovata, restituisci uno stato 404 Not Found
      return res.status(404).json({ message: 'Scarpa non trovata' });
    }

    // Invia la pagina di aggiornamento (modifica.ejs) e passa l'ID della scarpa come parametro
    res.status(200).render('modifica', { shoeId: shoe.id, brand: shoe.brand, model: shoe.model });
  } catch (error) {
    // In caso di errore interno, restituisci uno stato 500 Internal Server Error
    console.error('Errore nella rotta di modifica:', error);
    res.status(500).json({ message: 'Errore nella rotta di modifica', error: error.message });
  }
});

// Altri percorsi e logiche per l'aggiornamento delle scarpe potrebbero andare qui...

module.exports = router;

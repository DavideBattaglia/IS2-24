// routes/deleteCartRoute.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const tokenChecker = require('../middleware/tokenChecker');

// Rotta per eliminare tutti gli elementi dal carrello dell'utente
router.delete('/', tokenChecker, async (req, res) => {
    console.log("DELETE CART");
    try {
        // Ottieni l'ID dell'utente dal tokenChecker
        const userId = req.loggedUser.userId;

        // Elimina tutti gli elementi del carrello dell'utente specificato
        await Cart.deleteMany({ userId: userId });

        res.json({ success: true, message: 'Tutti gli elementi del carrello sono stati eliminati con successo.' });
    } catch (error) {
        console.error('Errore durante l\'eliminazione del carrello:', error.message);
        res.status(500).json({ success: false, message: 'Errore durante l\'eliminazione del carrello.' });
    }
});

module.exports = router;

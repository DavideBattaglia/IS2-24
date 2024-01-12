const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Shoe = require('../models/shoe'); // Importa il modello della scarpa
const tokenChecker = require('../middleware/tokenChecker');

// Rotta per ottenere tutte le scarpe nel carrello con un determinato userId
router.get('/', tokenChecker, async (req, res) => {
    try {
        // Recupera tutti gli elementi del carrello con userId specificato dal database
        const cartItems = await Cart.find({ userId: req.loggedUser.userId });

        // Estrai gli id delle scarpe nel carrello
        const shoeIds = cartItems.map(item => item.shoeId);

        // Recupera i dettagli delle scarpe con gli id estratti
        const shoesDetails = await Shoe.find({ _id: { $in: shoeIds } });
        console.log('Dettagli delle scarpe nel carrello:', shoesDetails);
        // Invia la risposta in formato JSON con i dettagli delle scarpe nel carrello
        res.json(shoesDetails);
    } catch (error) {
        console.error('Errore durante la richiesta al carrello:', error.message);
        res.status(500).json({ success: false, message: 'Errore durante la richiesta al carrello.' });
    }
});

module.exports = router;

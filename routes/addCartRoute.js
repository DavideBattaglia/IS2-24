// Importa i moduli necessari
const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const tokenChecker = require('../middleware/tokenChecker');

// Rotta per aggiungere un prodotto al carrello
router.post('/:shoeId', tokenChecker, async (req, res) => {
    try {
        // Estrai l'ID della scarpa dalla richiesta
        const shoeId = req.params.shoeId;

        console.log("Informazioni utente:", req.loggedUser);
        // Estrai l'ID dell'utente dal tokenChecker
        const userId = req.params.userId;

        console.log("userId:", userId);
        console.log("shoeId:", shoeId);

        // Crea un nuovo elemento del carrello
        const cartItem = new Cart({
            userId: userId,
            shoeId: shoeId,
        });

        // Salva l'elemento del carrello nel database
        const savedCartItem = await cartItem.save();
        console.log('Elemento del carrello salvato con successo:', savedCartItem);
        res.status(201).json(savedCartItem);
    } catch (error) {
        console.error('Errore durante l\'aggiunta al carrello:', error.message);
        res.status(500).json({ success: false, message: 'Errore durante l\'aggiunta al carrello.' });
    }
});

module.exports = router;

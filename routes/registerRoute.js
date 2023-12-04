const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assicurati di importare il modello User o il modulo necessario


// Definisci la logica della rotta per la registrazione
router.get('/', (req, res) => {
    res.render('register');
  });

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username e password richiesti' });
        }
  
        // Controlla se l'utente esiste già nel database
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username già in uso' });
        }
  
        // Crea un nuovo utente utilizzando il modello User
        const newUser = new User({ username, password });
        await newUser.save();
  
        res.status(201).json({ message: 'Utente registrato con successo' });
    } catch (error) {
        console.error('Errore nella registrazione dell\'utente:', error);
        res.status(500).json({ message: 'Errore nella registrazione dell\'utente' });
    }
  });

module.exports = router;
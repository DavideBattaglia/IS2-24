// isAdminMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRET_KEY || 'defaultSecretKey';

const isAdmin = async (req, res, next) => {
  try {
    // Ottieni il token dall'header della richiesta
    const token = req.headers.authorization || req.headers['x-access-token'] || req.query.token || req.body.token;

    if (!token) {
      return res.status(401).json({ message: 'Token non fornito.' });
    }

    // Decodifica il token
    const decoded = jwt.verify(token, secretKey);

    // Verifica se l'utente è un amministratore
    if (decoded.isAdmin) {
      // Se l'utente è un amministratore, prosegui con la richiesta
      next();
    } else {
      // Se l'utente non è un amministratore, restituisci un errore di accesso negato
      return res.status(403).json({ message: 'Accesso negato. Solo gli amministratori possono accedere a questa risorsa.' });
    }
  } catch (error) {
    console.error('Errore durante la verifica dell\'amministratore:', error.message);
    return res.status(500).json({ message: 'Errore durante la verifica dell\'amministratore' });
  }
};

module.exports = isAdmin;
// db.js
require('dotenv').config();

const mongoose = require('mongoose');

const getDbUrl = () => {
  // Ottieni l'URL del database in base all'ambiente (sviluppo, test, produzione)
  if (process.env.NODE_ENV === 'production') {
    // Imposta l'URL del database per l'ambiente di produzione
    return process.env.PRODUCTION_DB_URL;
  } else if (process.env.NODE_ENV === 'test') {
    // Imposta l'URL del database per l'ambiente di test
    return process.env.TEST_DB_URL;
  }

  // Imposta l'URL del database per l'ambiente di sviluppo (predefinito)
  return process.env.DEVELOPMENT_DB_URL;
  ///return process.env.DEVELOPMENT_DB_URL || 'mongodb://localhost:27017/punk';
};

mongoose.connect(getDbUrl())
  .then(() => {
    console.log('MongoDB Connection Succeeded.');
  })
  .catch((err) => {
    console.log('Error in DB connection: ' + err);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('MongoDB Connection Opened.');
  // Puoi inserire qui le azioni post-connessione, se necessario.
});

module.exports = mongoose;

// db.js
const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://provarent:provarent@cluster0.2k797.mongodb.net/punk';

mongoose.connect(dbUrl)
    .then(() => {
        console.log('MongoDB Connection Succeeded.');
    })
    .catch((err) => {
        console.log('Error in DB connection : ' + err);
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('MongoDB Connection Opened.');

    // Esempio di operazioni post-connessione
    // Puoi inserire qui le azioni che desideri eseguire dopo la connessione al database.
    // Ad esempio, definire modelli, eseguire operazioni iniziali, ecc.
});

module.exports = mongoose;

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const tokenChecker = require('./tokenChecker.js')
const mongoose = require('./config/db'); // Importa il modulo di configurazione del database
const User = require('./models/user'); // Importa il modello utente

dotenv.config();

const app = express();

const port = 3000;
const secretKey = process.env.SECRET_KEY || 'defaultSecretKey';

app.use(express.static('javascript'));//----------------------------------------BOH
app.use(express.static('views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());

const users = [];
//default user
users.push({username: 'a', password: 'a'});


app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/prova', (req, res) => {
  res.render('prova');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Cerca l'utente nel database
      const user = await User.findOne({ username, password });

      if (!user) {
          return res.status(401).json({ message: 'Credenziali non valide' });
      }

      // Genera un token JWT e lo invia come risposta
      const token = jwt.sign({ username: user.username }, secretKey);
      res.json({ token });
  } catch (error) {
      console.error('Errore nel login:', error);
      res.status(500).json({ message: 'Errore nel login' });
  }
});

/*
app.get('/protected', tokenChecker, (req, res) => {
  res.render('protected'); // Modifica req.user a req.loggedUser
});
*/

app.get('/protected', tokenChecker, (req, res) => {
  res.render('protected', { user: req.loggedUser });
});
/*
app.get('/protected', tokenChecker, (req, res) => {
  res.json({ success: true, message: 'Accesso consentito![SEI NELL AREA PROTETTA]', user: req.loggedUser });
});
*/
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

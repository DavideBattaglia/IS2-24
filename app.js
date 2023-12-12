const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('./config/db');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const protectedRoute = require('./routes/protectedRoute');
const shoeRoute = require('./routes/shoeRoute');
const addShoeRoute = require('./routes/addshoeRoute');
const deleteShoeRoute = require('./routes/deleteShoeRoute');
const updateShoeRoute = require('./routes/updateShoeRoute');
const modificaRoute = require('./routes/modificaRoute'); 
const tokenChecker = require('./middleware/tokenChecker');

const swaggerJsdoc = require('swagger-jsdoc')

const secretKey = process.env.SECRET_KEY || 'defaultSecretKey';

const app = express();
const port = 3000;

app.use(express.static('javascript'));
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/protected', protectedRoute);
app.use('/shoe', shoeRoute);
app.use('/addshoe', addShoeRoute);
app.use('/deleteShoe', deleteShoeRoute);
app.use('/updateshoe', updateShoeRoute);
app.use('/modifica', modificaRoute);


// Your other routes here...
app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/logout', (req, res) => {
  res.render('logout');
});

app.get('/vetrina', (req, res) => {
  res.render('vetrina');
});

app.get('/aggiungi', (req, res) => {
  res.render('aggiungi');
});

/*
app.get('/protected', tokenChecker, (req, res) => {
  res.render('protected', { user: req.loggedUser });
});*/

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shoe sellings',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes*.js'], // ,./api.yaml
};

const swaggerSpec = swaggerJsdoc(options);

app.get('/api-docs.json', (req,res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// Termina il server dopo che i test sono stati eseguiti
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

// Exporta l'app per i test
module.exports = app;
//app.js
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
const adminRoute = require('./routes/adminRoute');
const addCartRoute = require('./routes/addCartRoute');
const cartRoute = require('./routes/cartRoute');
const deleteCartRoute = require('./routes/deleteCartRoute');
const tokenChecker = require('./middleware/tokenChecker');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const secretKey = process.env.SECRET_KEY || 'defaultSecretKey';

const app = express();
const port = 4000;

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
app.use('/admin', adminRoute);
app.use('/addCart', addCartRoute);
app.use('/cart', cartRoute);
app.use('/deleteCart', deleteCartRoute);

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

app.get('/carrello', (req, res) => {
  res.render('carrello');
});

app.get('/adminpage', (req,res) => {
  res.render('adminpage');
})

app.get('/aggiungi', (req, res) => {
  res.render('aggiungi');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

// Exporta l'app per i test
module.exports = app;
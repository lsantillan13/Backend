//---------------------------- Requiring stuff ------------------------------//
/*                                                                           */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
/*const mongoose = require('mongoose');
const multer = require('multer');
/*                                                                           */
//-------------------------------- Models -----------------------------------//
/*                                                                           */
//const Products = require('./models/products');
/*                                                                          */
//--------------------------- Initialization --------------------------------//
/*                                                                          */
const app = express();
//----------------------------- Middlewares ---------------------------------//
/*                                                                          */
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces', 8);
app.use(cors());
app.use(morgan('dev'));
/*                                                                          */
//----------------------------- Static Files -------------------------------//
/*                                                                          */
//app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsdir: path.join(app.get('views'), '/partials'),
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');
app.use(express.static('public'));
/*                                                                          */
//--------------------------------- Routes ---------------------------------//
/*                                                                          */
const productsRoutes = require('./Router/products.routes');

//============ API Routes ===========//
/*                                   */
app.use('/api', productsRoutes);
app.get('/formulario');
//=========  Client Routes  =========//
/*                                   */
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/productos', (req, res) => {
  res.render('products');
});
/*                                   */
/*                                                                          */
//--------------------------------- Server ---------------------------------//
/*                                                                          */
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Server is running on port', app.get('port'));
});
/*                                                                          */
//--------------------------------- Others ---------------------------------//
/*                                                                          */

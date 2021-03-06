//--------------------------------------------------------------------IMPORTS----------------------------------------------------------------------\\
/**/                                                                                                                                             /**/
/**/ if (process.env.NODE_ENV !== 'production')                                                                                                  /**/
/**/  {require('dotenv').config()}                                                                                                               /**/
/**/ const express = require('express');                                                                                                         /**/
/**/ const mongoose = require('mongoose');                                                                                                       /**/
/**/ const cors = require('cors');                                                                                                               /**/
/**/ const multer = require('multer');                                                                                                           /**/
/**/ const morgan = require('morgan');                                                                                                           /**/
/**/ const path = require('path');                                                                                                               /**/
/**/ const fs = require('fs');                                                                                                                   /**/
/**/ const Container = require('./controllers/product.controllers.js');                                                                                                    /**/
/**/                                                                                                                                             /**/
//------------------------------------------------------------------MODELS-------------------------------------------------------------------------\\
/**/ //const Products = require('./models/products');                                                                                            /**/
//------------------------------------------------------------------INITIALIZATION-----------------------------------------------------------------\\
/**/                                                                                                                                             /**/
/**/ const app = express();                                                                                                                      /**/
/**/ //require('./database')                                                                                                                     /**/
/**/                                                                                                                                             /**/
//--------------------------------------------------------------------STATIC-----------------------------------------------------------------------\\
/**/ app.use(express.static(path.join(__dirname, 'public')));                                                                                    /**/
//--------------------------------------------------------------------MIDDLEWARES------------------------------------------------------------------\\
/**/ app.use(express.json());                                                                                                                    /**/
/**/ app.use(express.urlencoded({extended: false}));                                                                                             /**/
/**/ app.set('json spaces', 8);                                                                                                                 /**/
/**/ app.use(cors());                                                                                                                            /**/
/**/ app.use(morgan('dev'));                                                                                                                     /**/
//--------------------------------------------------------------------ROUTES-----------------------------------------------------------------------\\
/**/                                                                                                                                             /**/
/**/ const productsRoutes = require('./Router/products.routes')                                                                                  /**/
/**/                                                        /*------Main Router------*/                                                          /**/
/**/ app.use('/api', productsRoutes)                                                                                                             /**/
/**/ app.get('/formulario')                                                                                                                      /**/
/**/                                                                                                                                             /**/
/**/                                                                                                                                             /**/
/**/                                                        /*---Lista de productos---*/                                                         /**/
/**/                                                                                                                                             /**/
/**/                                                        /*----Productos Random----*/                                                         /**/
/**/                                                                                                                                             /**/
/**/                                                                                                                                             /**/
//-------------------------------------------------------------------SERVER-UP---------------------------------------------------------------------\\
/**/                                                                                                                                             /**/
/**/ app.set('port', process.env.PORT || 3000);                                                                                                  /**/
/**/ app.listen(app.get('port'), () => {console.log('Server is running on port', app.get('port')); });                                           /**/
/**/                                                                                                                                             /**/
//-------------------------------------------------------------------SERVER-UP---------------------------------------------------------------------\\
/**/                                                                                                                                             /**/
//-------------------------------------------------------------------SERVER-UP---------------------------------------------------------------------\\
/**/                                                                                                                                             /**/
//-------------------------------------------------------------------SERVER-UP---------------------------------------------------------------------\\
/**/                                                                                                                                             /**/
//-------------------------------------------------------------------SERVER-UP---------------------------------------------------------------------\\
/**/                                                                                                                                             /**/
//-------------------------------------------------------------------SERVER-UP---------------------------------------------------------------------\\
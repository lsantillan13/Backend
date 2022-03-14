const express = require('express');
const router = express.Router();
//const Model = require('../db/model');
/*===== // =====*/
//const {mariaDB} = require('../db/mariaDB/options');
//const productsTable = 'products';
/*===== // =====*/
//const product = new Model(mariaDB, productsTable);

const ProductosDAO = require('../Daos/productos/MongoDB.js');
const productos = new ProductosDAO();

//                                                                   /*----- POST -------*/
router.post('/productos', (req, res) => { productos.createProduct(req, res); });
//                                                                  /*------- GET -------*/
//router.get('/productos',  (req, res ) => { productosDao.getAll(req, res); });
//router.get('/productos', (req, res) => {productosDao.getAll; });
//                                                                /*----- GET BY ID -----*/
//router.get('/productos/:id', (req, res) => { product.getById(req, res); });
//                                                               /*----- PUT BY ID-------*/
//router.put('/productos/:id', (req, res) => { product.updateById(req, res); });
//                                                             /*----- DELETE BY ID-------*/
//router.delete('/productos/:id', (req, res) => { product.deleteById(req, res); });
//                                                           /*----- DELETE THEM ALL-------*/
//router.get('/delete', (req, res) => { product.deleteAll(req, res);});

module.exports = router;
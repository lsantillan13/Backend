const express = require('express');
const router = express.Router();
const Model = require('../db/model');
/*===== // =====*/
const {mariaDB} = require('../db/mariaDB/options');
const productsTable = 'products';
/*===== // =====*/
const product = new Model(mariaDB, productsTable);

//                                                                   /*----- POST -------*/
router.post('/productos', (req, res) => { product.save(req, res); });
//                                                                  /*------- GET -------*/
router.get('/productos',  (req, res ) => { product.getAll(req, res); });
//                                                                /*----- GET BY ID -----*/
router.get('/productos/:id', (req, res) => { product.getById(req, res); });
//                                                               /*----- PUT BY ID-------*/
router.put('/productos/:id', (req, res) => { product.updateById(req, res); });
//                                                             /*----- DELETE BY ID-------*/
router.delete('/productos/:id', (req, res) => { product.deleteById(req, res); });
//                                                           /*----- DELETE THEM ALL-------*/
router.get('/delete', (req, res) => { product.deleteAll(req, res);});

module.exports = router;
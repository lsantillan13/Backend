/*===== // =====*/
const express = require('express');
const router = express.Router();
/*===== // =====*/
//const {mariaDB} = require('../db/mariaDB/options');
//const productsTable = 'products';
//const product = new Model(mariaDB, productsTable);
/*===== // =====*/

/*================================ - DAO - ================================

/*===== MONGODB =====*/
//const ProductosDAO = require('../Daos/productos/MongoDB.js');
//const DAO = new ProductosDAO();
/*
router.post('/productos', (req, res) => { DAO.createProduct(req, res); });
router.get('/productos',  () => DAO.getAll());
router.get('/productos/:id', (req, res) => { DAO.getById(req, res); });
router.put('/productos/:id', (req, res) => { DAO.updateById(req, res); });
router.delete('/productos/:id', (req, res) => { DAO.deleteById(req, res); });
//router.get('/delete', (req, res) => { product.deleteAll(req, res);});
*/

/*===== FileSystem =====*/
//const ProductosDaoArchivo = require('../Daos/productos/Archivo.js');
//const DAO = new ProductosDaoArchivo();
/*
router.post('/productos', (req, res) => { DAO.createProduct(req, res); });
router.get('/productos',  (req, res) => DAO.getAll(req, res));
router.get('/productos/:id', (req, res, next) => { DAO.getById(req, res, next); });
router.put('/productos/:id', (req, res, next) => { DAO.updateById(req, res, next); });
//router.delete('/productos/:id', (req, res) => { DAO.deleteById(req, res); });
*/

/*===== SQLITE3 =====*/
const SqliteDAO = require('../Daos/productos/Sqlite.js');
const DAO = new SqliteDAO();

// => Manage Products
router.post('/productos', (req, res) => { DAO.createProduct(req, res); });
router.get('/productos',  (req, res) => DAO.getAll(req, res));
//router.get('/productos', () => {DAO.createTable();});
router.get('/productos/:id', (req, res, next) => { DAO.getById(req, res, next); });
router.put('/productos/:id', (req, res, next) => { DAO.updateById(req, res, next); });
router.delete('/productos/:id', (req, res, next) => { DAO.deleteById(req, res, next); });

// => Manage Cart
router.get('/cart', (req, res) => {DAO.cartCreate(req, res); });
router.get('/cart/:id', (req, res) => {DAO.getCart(req, res); });
//router.get('/cart/:id', (req, res) => {DAO.deleteCart(req, res); });

/*=== Remove Table && Create Table ===*/
//router.get('/cart', (req, res) => {DAO.removeTable(req, res); });
//router.get('/cart', (req, res) => {DAO.cartTable(req, res);});

// => Add to && Remove from Cart
router.get('/cart/:cartId/add/:productId', (req, res) => {DAO.addToCart(req, res); });
router.delete('/cart/:cartId/remove/:productId', (req, res) => {DAO.removeFromCart(req, res); });
/*============================================ TODO ============================================*/
//      /*===== Firebase =====*/
/*
const FirebaseDAO = require('../Daos/productos/Firebase.js');
const DAO = new FirebaseDAO();

// => Manage Products
router.post('/productos', (req, res) => { DAO.createProduct(req, res); });
router.get('/productos',  (req, res) => DAO.getAll(req, res));
router.get('/productos/:id', (req, res) => { DAO.getById(req, res); });
router.put('/productos/:id', (req, res) => { DAO.updateById(req, res); });
router.delete('/productos/:id', (req, res) => { DAO.deleteById(req, res); });
//===================== TODO =================/
  // => Cart routes
  router.get('/cart', (req, res) => {DAO.cartCreate(req, res); });
  router.get('/cart/:id', (req, res) => {DAO.getCart(req, res); });
  router.delete('/cart/:id', (req, res) => {DAO.deleteCart(req, res); });
  // => Add to && Remove from Cart
  router.get('/cart/:cartId/add/:productId', (req, res) => {DAO.addToCart(req, res); });
  router.delete('/cart/:cartId/remove/:productId', (req, res) => {DAO.removeFromCart(req, res); });
*/

//      /*===== Memory =====*/
/*
const MemoryDAO = require('../Daos/productos/Memory.js');
const DAO = new MemoryDAO();

// => Manage Products
router.post('/productos', (req, res) => { DAO.createProduct(req, res); });
router.get('/productos',  (req, res) => DAO.getAll(req, res));
router.get('/productos/:id', (req, res, next) => { DAO.getById(req, res, next); });
router.put('/productos/:id', (req, res, next) => { DAO.updateById(req, res, next); });
router.delete('/productos/:id', (req, res, next) => { DAO.deleteById(req, res, next); });

// => Cart routes
router.get('/cart', (req, res) => {DAO.cartCreate(req, res); });
router.get('/cart/:id', (req, res) => {DAO.getCart(req, res); });
router.delete('/cart/:id', (req, res) => {DAO.deleteCart(req, res); });
// => Add to && Remove from Cart
router.post('/cart/:cartId/add/:productId', (req, res) => {DAO.addToCart(req, res); });
router.delete('/cart/:cartId/remove/:productId', (req, res) => {DAO.removeFromCart(req, res); });
*/
module.exports = router;
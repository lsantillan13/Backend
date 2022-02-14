const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart.controllers');
/***----------------------------------------------Regular requests-------------------------------------------------------------------*/
const cart = new Cart();
//                                                               /*----- POST -------*/
router.post('/productos', cart.save);
//                                                               /*----- GET -------*/
router.get('/productos', cart.getAll);
//                                                            /*----- GET BY ID-------*/
router.get('/productos/:id', cart.getById);
//                                                            /*----- PUT BY ID-------*/
router.put('/productos/:id', cart.updateById);
//                                                           /*----- DELETE BY ID-------*/
router.delete('/productos/:id', cart.deleteById);

module.exports = router;
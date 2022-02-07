const express = require('express');
const router = express.Router();
const Products = require('../controllers/product.controllers');
const fs = require('fs');
/*------------------------------------------------------------------Regular requests--------------------------------------------------------------------------*/
const newProd = new Products;
//                                                               /*----- POST -------*/
router.post('/productos', newProd.save);
//                                                               /*----- GET -------*/
router.get('/productos', newProd.getAll);
//                                                            /*----- GET BY ID-------*/
router.get('/productos/:id', newProd.getById);
//                                                            /*----- PUT BY ID-------*/
router.put('/productos/:id', newProd.updateById)
//                                                           /*----- DELETE BY ID-------*/
router.delete('/productos/:id', newProd.deleteById);

module.exports = router;
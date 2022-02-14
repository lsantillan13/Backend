const express = require('express');
const router = express.Router();
const Products = require('../controllers/product.controllers');
/*------------------------------------------------------------------Regular requests--------------------------------------------------------------------------*/
const product = new Products();
//                                                               /*----- POST -------*/
router.post('/productos', product.save);
//                                                               /*----- GET -------*/
router.get('/productos', product.getAll);
//                                                            /*----- GET BY ID-------*/
router.get('/productos/:id', product.getById);
//                                                            /*----- PUT BY ID-------*/
router.put('/productos/:id', product.updateById);
//                                                           /*----- DELETE BY ID-------*/
router.delete('/productos/:id', product.deleteById);

module.exports = router;
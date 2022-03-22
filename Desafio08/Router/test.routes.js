const express = require('express');
const router = express.Router();

const Cart = require('../controllers/cart.controllers');
const cart = new Cart();

//                                                                     /*----- POST -------*/
router.get('/', cart.create); // Crea un carrito y devuelve su ID.
//                                                                     /*===== DELETE ======*/
//router.delete('/:id/productos', cart.delete);
router.delete('/:id', cart.delete);
//                                                                     /*----- GET -------*/
router.get('/:id/productos', cart.getById); // Lista todos los productos guardados en el carrito.
//                                                                     /*----- POST -------*/
router.post('/:id/productos/:productId', cart.addProd); //  Para incorporar productos al carrito por su id de producto
//                                                                 /*----- DELETE BY ID-------*/
router.delete('/:id/productos/:id_prod', cart.removeProd);
//router.get('/2', [handleAuthorization], cart.getById); // Lista todos los productos guardados en el carrito.
//router.delete('/:id/productos',  ); // Eliminar producto x ID de CARRITO y por ID de PRODUCTO.
//router.delete('/:id', ); // Vacía un carrito y lo elimina.





module.exports = router;
const express = require('express');
const router = express.Router();

const Cart = require('../controllers/cart.controllers');
const cart = new Cart();
//                                                               /*----- POST -------*/
router.get('/', cart.save); // Crea un carrito y devuelve su ID.
//
router.post('/:id/productos'); // Incorporar productos al carrito por su ID.
//                                                               /*----- GET -------*/
router.get('/:id/productos'); // Lista todos los productos guardados en el carrito.
//                                                           /*----- DELETE BY ID-------*/
router.delete('/:id/productos'); // Eliminar producto x ID de CARRITO y por ID de PRODUCTO.
//
router.delete('/:id'); // Vacía un carrito y lo elimina.





module.exports = router;
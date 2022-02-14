const express = require('express');
const router = express.Router();

const Cart = require('../controllers/cart.controllers');
const cart = new Cart();


const handleAuthorization = () => {
  let user = {isAdmin: false};
  user.isAdmin === true ? cart.save() : null;
};
//                                                               /*----- POST -------*/
router.get('/', handleAuthorization); // Crea un carrito y devuelve su ID.
//

//router.post('/:id/productos'); // Incorporar productos al carrito por su ID.
//                                                               /*----- GET -------*/
//router.get('/:id/productos'); // Lista todos los productos guardados en el carrito.
//                                                           /*----- DELETE BY ID-------*/
//router.delete('/:id/productos'); // Eliminar producto x ID de CARRITO y por ID de PRODUCTO.
//
//router.delete('/:id'); // Vacía un carrito y lo elimina.





module.exports = router;
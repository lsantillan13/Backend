const express = require('express');
const router = express.Router();
const Products = require('../controllers/product.controllers');
/*------------------------------------------------------------------Regular requests--------------------------------------------------------------------------*/
const product = new Products();
/* Is Admin ? */
const handleAuthorization = (req, res, next) => {
  const user = {isAdmin: true};
  if (user.isAdmin === true) next();
  else{res.status(401).json({error: 'Unauthorized'});}
};
//                                                               /*----- POST -------*/
router.post('/productos', [handleAuthorization], product.save);
//                                                               /*----- GET -------*/
router.get('/productos', product.getAll);
//                                                            /*----- GET BY ID-------*/
router.get('/productos/:id', product.getById);
//                                                            /*----- PUT BY ID-------*/
router.put('/productos/:id', [handleAuthorization], product.updateById);
//                                                           /*----- DELETE BY ID-------*/
router.delete('/productos/:id', [handleAuthorization], product.deleteById);

module.exports = router;
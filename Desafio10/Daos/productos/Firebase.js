/*===== // =====*/
const ContenedorFirebase = require('../../controllers/products/Firebase.controllers.js');
const config = require('../../utils/config.js');
/*===== // =====*/
class FirebaseDAO extends ContenedorFirebase { constructor(){super(config.firebase.products.collection, config.firebase.cart.collection); }}
/*===== // =====*/
module.exports = FirebaseDAO;
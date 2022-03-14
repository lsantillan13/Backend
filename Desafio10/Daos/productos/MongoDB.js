/*==== // ====*/
const exportedContainer = require('../../controllers/MongoDB.controllers.js');
//const model = require('../../models/products.model');

/* MongoDB Data Access Object */
class ProductosDAO extends exportedContainer{
  constructor(){
    super('Productos', {title: {type: String, required: true},
      desription: {type: String, required: true},
      price: {type: Number, required: true},
    });
  }
}
/*==== // ====*/
module.exports = ProductosDAO;
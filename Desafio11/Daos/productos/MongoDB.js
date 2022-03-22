const ContenedorMongoDB = require('../../controllers/products/MongoDB.controllers.js');


class ProductosDAO extends ContenedorMongoDB {
  constructor(){
    super(
      'productos',
      {
        title: { type: String, require: true },
        price: { type: Number, require: true },
        img: { type: String, require: true },
        description: { type: String}
      }
    );
  }
}

module.exports = ProductosDAO;
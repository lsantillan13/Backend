/*===== // =====*/
const ContenedorArchivo = require('../../controllers/products/Archivo.controllers.js');
const config = require('../../utils/config.js');
/*===== // =====*/
class ProductosDaoArchivo extends ContenedorArchivo{ constructor(){ super(config.archivo.URL); } }
/*===== // =====*/
module.exports = ProductosDaoArchivo;
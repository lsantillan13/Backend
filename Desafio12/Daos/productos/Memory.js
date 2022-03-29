/*===== // =====*/
const ContenedorMemory = require('../../controllers/products/Memory.controllers.js');
const config = require('../../utils/config.js');
/*===== // =====*/
class MemoryDAO extends ContenedorMemory{ constructor(){ super(config.memoria.products.filename, config.memoria.cart.filename); } }
/*===== // =====*/
module.exports = MemoryDAO;
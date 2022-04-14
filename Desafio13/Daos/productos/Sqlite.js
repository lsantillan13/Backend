/*===== // =====*/
const ContenedorSqlite = require('../../controllers/products/Sqlite.controllers.js');
const config = require('../../utils/config.js');
/*===== // =====*/
class SqliteDAO extends ContenedorSqlite{ constructor(){ super(config.Sqlite, 'Products', 'Cart'); } }
/*===== // =====*/
module.exports = SqliteDAO;
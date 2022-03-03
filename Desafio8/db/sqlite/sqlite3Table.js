/*===== BETTER-SQLITE3 =====*/
const { options } = require('./options');
const knex = require('knex')(options);

knex.schema.createTable('Messages', table => {
  table.increments('id');
  table.string('username');
  table.string('message');
  table.string('date');
})
  .then(() => {console.log('Messages table created'); })
  .catch((error) => {console.log({ code: error.errno, msg: error.sqlMessage}); })
  .finally(() => { knex.destroy(); });

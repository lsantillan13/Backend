/*===== Maria DB =====*/
const { options } = require('./options');
const knex = require('knex')(options);

knex.schema.createTable('products', table => {
  table.increments('id');
  table.string('title', 25).notNullable();
  table.string('price', 25).notNullable();
  table.string('img', 25).notNullable();
})
  .then(() => { console.log('table created');})
  .catch((error) => { console.log({ code: error.errno, msg: error.sqlMessage}); })
  .finally(() => { knex.destroy(); });

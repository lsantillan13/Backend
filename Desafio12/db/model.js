const knexLib = require('knex');

class Model{
  constructor(options, table){ this.knex = knexLib(options); this.table = table; }

  createTable(){

    /*===== MYSQL =====*/
    if (this.table === 'messages'){
      return this.knex.schema.createTable(this.table, table => {
        table.increments('id');
        table.string('username');
        table.string('message');
        table.string('date');
      })
        .then(() => {console.log(`${this.table} table created`); })
        .catch((error) => {console.log({ code: error.errno, msg: error.sqlMessage}); })
        .finally(() => { this.knex.destroy(); });
    }
    
    /*===== MariaDB =====*/
    else {
      return this.knex.schema.createTable(this.table, table => {
        table.increments('id');
        table.string('title', 25).notNullable();
        table.string('price', 25).notNullable();
        table.string('img', 25).notNullable();
      })
        .then(() => { console.log(`${this.table} table created`);})
        .catch((error) => { console.log({ code: error.errno, msg: error.sqliteMessage}); })
        .finally(() => { this.knex.destroy(); });
    }
  }

  /*============================== Create ==============================*/
  save(req, res){
    /*===== MYSQL =====*/
    const {title, price, img} = req.body;
    return this.knex(this.table).insert({title: title, price: price, img: img})
      .then(() => {console.log(`Product ${title} has been inserted`) &&
      res
        .status(200)
        .send({ Message: `Product ${title} has been inserted`});
      })
      .catch((err) => {console.log(err); });    
  }

  saveMessage(data, res){
    /*===== MariaDB =====*/
    return this.knex(this.table).insert({ username: data.username, message: data.message, date: data.date})
      .then(() => {console.log('Message appended to DB') &&
    res
      .status(200)
      .send({ Mesasge: 'Message appended to DB'});
      })
      .catch((err) => {console.log(err); });
  }

  /*============================== Read ==============================*/
  
  getMessages(req, res){
    return this.knex(this.table).select('*')
      .then((rows) => {res.status(200).send(rows);})
      .catch((err) => { console.log(err); });
  }
  getAll(req, res){
    return this.knex(this.table).select('*')
      .then((rows) => { res.status(200).send(rows); } )
      .catch((err) => { console.log(err); } );
  }

  getById(req, res){
    const productId = req.params.id;

    this.knex(this.table)
      .where({id: productId})
      .then((row) => { res.send({row}); })
      .catch((err) => { console.log(err); });      
  }
  /*============================== Delete ==============================*/
  deleteById(req, res){
    const productId = req.params.id;

    this.knex(this.table)
      .where({id: productId})
      .del()
      .then(() => { res.send({msg: `Product with id ${productId} has been deleted`}) && console.log({msg: `Product with id ${productId} has been deleted`}); })
      .catch((err) => console.log(err));
  }

  /*============================== Update ==============================*/

  updateById(req, res){

    this.knex(this.table)
      .where('id', req.params.id)
      .update({
        title: req.body.title,
      })
      .returning('*')
      .then(() => {console.log(`Product with ID: ${req.params.id} has been updated to ${req.body.title}`); res.send({msg: 'Product updated'});})
      .catch((err) => {console.log(err); });

  }

}

module.exports = Model;
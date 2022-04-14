const knexLib = require('knex');
const { normalize, schema } = require ('normalizr');

class Model{
  constructor(options, table){ this.knex = knexLib(options); this.table = table; }

  createTable(){
    return this.knex.schema.createTable(this.table, table => {
      table.increments('id');
      table.string('author');
      table.string('message');
    })
      .then(() => {console.log(`${this.table} table created`); })
      .catch((error) => {console.log({ code: error.errno, msg: error.sqlMessage}); })
      .finally(() => { this.knex.destroy(); });
  }
    
  /*============================== Create ==============================*/
  saveMessage(data, res){
    let author = JSON.stringify(data.author, 8, '\t');
    let message = JSON.stringify(data.message, 8, '\t');
    return this.knex(this.table)
      .insert({ author, message })
      .then(() => {
        console.log('Message appended to DB') &&
      res
        .status(200)
        .send({ Message: 'Message appended to DB'});
      })
      .catch((err) => {console.log(err); });
  }

  /*============================== Read ==============================*/
  getMessages(req, res){
    
    let table = [];

    /*----- Normalizr -----//
    const user = new schema.Entity('users');
    const mySchema = [{ users: [user] }];
    const normalizedData = normalize(rows, mySchema);
    let data = normalizedData.result;
      for (let i = 0; i < data.length; i++){
        let content = { id: data[i].id, author: JSON.parse(data[i].author), message: JSON.parse(data[i].message) }; table.push(content);
      }
    */
    
    /*------ Rows ------*/
    return this.knex(this.table).select('*')
      .then((rows) => {
        for (let i = 0; i < rows.length; i++){
          let content = { id: rows[i].id, author: JSON.parse(rows[i].author), message: JSON.parse(rows[i].message) }; table.push(content);
        }
        res.status(200).send(table);
      })
      .catch((err) => { console.log(err); });
  }

  deletetable(req, res){
    return this.knex.schema.dropTable(this.table)
      .then(() => res.send({Msg: `${this.table} Table deleted`}))
      .catch((err) => console.log(err));
  }

}
module.exports = Model;
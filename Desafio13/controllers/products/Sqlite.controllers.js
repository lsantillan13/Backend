const knexLib = require('knex');
let arr = [];
class ContenedorSqlite{
  constructor(options, table, cart){this.knex = knexLib(options); this.table = table; this.cart = cart;}

  createTable(){
    return this.knex.schema.createTable(this.table, table => {
      table.increments('id');
      table.string('title', 25).notNullable();
      table.string('price', 25).notNullable();
      table.string('img', 25).notNullable();
    })
      .then(() => {console.log(this.table, 'Created');})
      .catch((err) => { console.log({ code: err.errno, msg: err});})
      .finally(() => {this.knex.destroy();});
  }
  
  createProduct(req, res){
    const {title, price, img} = req.body;
    return this.knex(this.table).insert({title: title, price: price, img: img})
      .then(() => {console.log(`Product ${title} has been inserted`) &&
      res
        .status(200)
        .send({ Message: `Product ${title} has been inserted`});
      })
      .catch((err) => {console.log(err); });    
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

  deleteById(req, res){
    //  //  //  //
    const productId = req.params.id;
    this.knex(this.table)
      .where({id: productId})
      .del()
      .then(() => { res.send({msg: `Product with id ${productId} has been deleted`}) && console.log({msg: `Product with id ${productId} has been deleted`}); })
      .catch((err) => console.log(err));
  }

  cartTable(req, res){ return this.knex.schema.createTable(this.cart, table => { table.increments('cartID'); table.json('Products').notNullable();})
    .then(() => res.send({Msg: `${this.cart} Table created`}))
    .catch((err) => { console.log({ code: err.errno, msg: err});})
    .finally(() => {this.knex.destroy();});
  }

  removeTable(req, res){
    return this.knex.schema.dropTable(this.cart)
      .then(() => res.send({Msg: `${this.cart} Table deleted`}))
      .catch((err) => console.log(err));
  }

  cartCreate(req, res){
    /*Creation*/
    this.knex(this.cart).insert({Products: 'Empty Cart'}).returning('cartID')
      .then((cartID) => { res.send({Msg: `Cart created under ID ${cartID}`});})
      .catch((err) => { console.log(err); });
    /*Manipulation*/
  }

  getCart(req, res){
    const {id} = req.params;
    this.knex(this.cart)
      .where({cartId: id})
      .then((row) => {
        res.send(row[0]);
      })
      .catch((err) => { console.log(err); });      
  }

  deleteCart(req, res){
    const {id} = req.params;
    this.knex(this.cart)
      .where({cartId: id})
      .del()
      .then(() => { res.send({msg: `Cart on ID: ${id} has been deleted`}); })
      .catch((err) => console.log(err));
  }
  addToCart(req, res){
    /*Primera lectura de los productos en el carrito*/
    this.knex(this.cart)
      .where({cartId: req.params.cartId})
      .then(async (cart) => {
        if (cart[0].Products === 'Empty Cart'){          
          /*Agrego el producto filtrado al array en memoria*/
          let prod = await this.knex(this.table)
            .where({id: req.params.productId})
            .then((prod) => prod);
          arr.push(...prod);
          console.log(arr);     

          this.knex(this.cart)
            .where({cartId: req.params.cartId})
            .update({Products: arr})
            .then((row) => res.send({row} && console.log(row)))
            .catch((err) => { console.log(err); });
        }
        else{
          res.send({Msg: 'Cart is filled'});
        }
      })
      .catch((err) => { console.log(err); });
    /*
    this.knex(this.table)
    .where({id: idProd})
    .then((prod) => {
      this.knex(this.cart)
      .where({cartID: id})
      .update({Products: prod})
      .then((cart) => {
        // Cart
        let A = cart[0];
        // Prod
        let parsedProd = prod[0];
        let C = arr;
        arr.push(parsedProd);
        res.send({A, C});
      })
      .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
    */
  }
  // removeFromCart(req, res){
  //   this.knex(this.cart);
  // }

}

module.exports = ContenedorSqlite;
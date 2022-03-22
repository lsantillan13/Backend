const config = {
  mongoDB: {
    URL: 'mongodb+srv://Admin:Asd123@cluster0.qdd3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  },
  firebase : {
    products: {collection: 'Productos'},
    cart: {collection: 'Carts'}
  },
  archivo:{
    URL: './data/productos.txt'
  },
  memoria:{
    products: {filename: './data/memory.txt'},
    cart: {filename: './data/cart.txt'}

  },
  Sqlite:{
    client: 'sqlite3',
    connection: {filename: './db/sqlite/db/mydb.sqlite'},
    useNullAsDefault: true,
  }
};

module.exports = config;
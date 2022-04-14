/*===== // =====*/
const admin = require('../../utils/Firebase.js');
const { collection, doc, setDoc } = require('firebase-admin');
const db = admin.firestore();    
/*===== // =====*/
class ContenedorFirebase{
  constructor(productsRoute, cartRoute){this.productsRoute = productsRoute; this.cartRoute = cartRoute;}
  /*===== // =====*/

  /*=============================================================== Product Methods ===============================================================*/
  async createProduct(req, res){
    const query = db.collection(this.productsRoute);
    const {title, price, img} = req.body;

    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    try{
      let doc = query.doc(`${docs.length + 1}`);
      await doc.create({title, price, img});
      return res.status(201).send({Msg: 'Product created successfully'});
    }
    catch(err){ return res.send({ Error: err}); }
  } /*===== // =====*/

  async getAll(req, res){
    const query = db.collection(this.productsRoute);
    try{
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;

      const response = docs.map((doc) => ({ id: doc.id, title: doc.data().title, price: doc.data().price, img: doc.data().img,}));
      return res.send(response);
    }
    catch(err){ return res.send({ Error: err}); }
  } /*===== // =====*/

  async getById(req, res){
    const {id} = req.params; 
    const query = db.collection(this.productsRoute);
    try{
      const doc = query.doc(id);
      const item = await doc.get();
      const response = item.data();
      res.status(200).send(response);
    }
    catch(err){ res.send({Error: err}); }
  } /*===== // =====*/

  async updateById(req, res){
    const {id} = req.params;
    const { title, price, img } = req.body;
    const query = db.collection(this.productsRoute);
    try{
      const doc = query.doc(id);
      await doc.update({title, price, img});
      res.status(200).send({ Msg: 'Product updated succesfull'});
    }
    catch(err){ res.send({Error: err}); }
  } /*===== // =====*/

  async deleteById(req, res){
    const {id} = req.params;
    const query = db.collection(this.productsRoute);
    try{
      const doc = query.doc(id);
      const item = await doc.delete();
      res.status(200).send({ item, Msg: 'Product deleted successfully'});
    }
    catch(err){ res.send({Error: err}); }
  } /*===== // =====*/
  /*=============================================================== Cart Methods ===============================================================*/
  async cartCreate(req, res){
    const query = db.collection(this.cartRoute);
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;
    try{
      let doc = query.doc(`${docs.length + 1}`);
      await doc.create({ Cart: []});
      return res.status(201).send({Msg: `Cart created under id ${docs.length + 1 }`});
    } catch(err){ res.status(400).send({Error: err});}
  }
  async getCart(req, res){
    const {id} = req.params; 
    const query = db.collection(this.cartRoute);
    try{
      const doc = query.doc(id);
      const item = await doc.get();
      const response = item.data();
      res.status(200).send(response);
    }
    catch(err){ res.send({Error: err}); }
  }
  async deleteCart(req, res){
    const {id} = req.params;
    const query = db.collection(this.cartRoute);
    try{
      const doc = query.doc(id);
      const item = await doc.delete();
      res.status(200).send({ item, Msg: 'Cart deleted successfully'});
    }
    catch(err){ res.send({Error: err}); }
  } /*===== // =====*/
  async addToCart(req, res){
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const cartQuery = db.collection(this.cartRoute);
    const prodQuery = db.collection(this.productsRoute);

    try{
      /*===== Handling Cart =====*/
      const cartDoc = cartQuery.doc(cartId);
      const cartItem = await cartDoc.get();
      const cartResponse = cartItem.data();
      /*===== Handling Cart =====*/
      const prodDoc = prodQuery.doc(productId);
      const prodItem = await prodDoc.get();
      const prodResponse = prodItem.data();
      //cartDoc.update({'Carrito.1': [...cartResponse]});

      console.log(cartResponse.carrito)


      res.status(200).send('hola');
    }
    catch(err){ console.log(err); }

    // try{
    //   let doc = query.doc(id);
    //   await doc.create({title, price, img});
    //   return res.status(201).send({Msg: 'Product created successfully'});
    // }
    // catch(err){ return res.send({ Error: err}); }
  }
  //   async cart(req, res){
  //     const query = db.collection.this.cartRoute;
  //   }

}

module.exports = ContenedorFirebase;
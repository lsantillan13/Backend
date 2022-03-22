const fs = require('fs');
function uniqueID() { return Math.floor(Math.random() * Math.floor(Math.random() * Date.now())); }
/*===== && =====*/

class ContenedorMemory{
  constructor(productRoute, cartRoute){ this.productRoute = productRoute; this.cartRoute = cartRoute;}
  /*======================================= PRODUCTS METHODS =======================================*/
  async createProduct(req, res){
    if(fs.existsSync(this.productRoute)){
      const {title, price, img} = req.body;
      const parsed = await JSON.parse(fs.readFileSync(this.productRoute, 'utf-8'));
      parsed.push({ title, price, img, id: parsed.length + 1 });
      fs.writeFileSync(this.productRoute, JSON.stringify(parsed, 8, '\t'));
      res.status(200).send({Msg: 'Product added'});
    }
    else{ fs.writeFile(this.productRoute, '[]', function(err) { if(err) { throw err;} res.status(200).send({Msg: 'File Created'}); }); }
  }   /*===== // =====*/

  async getAll(req, res){
    try{ const parsed = await JSON.parse(fs.readFileSync(this.productRoute, 'utf-8')); res.status(200).send(parsed);}
    catch(err){ res.status(400).send({Error: err}); }
  }   /*===== // =====*/

  async getById(req, res, next){
    try {
      const parsed = JSON.parse(fs.readFileSync(this.productRoute, 'utf-8'));
      const productId = req.params.id;
      let A = parsed.filter((x) => { return x.id == productId; }); // Id is getting filtered
      A[0].id == productId ? res.send(A) : next(); // If id matchs it's sended to client // if theres an error Next() goes to Catch()
    } catch (error) { res.send({ Error: 'Producto no encontrado' }); }
  }   /*===== // =====*/
  
  async updateById(req, res, next){
    try {
      const PARSED = JSON.parse(fs.readFileSync(this.productRoute, 'utf-8'));
      const productId = req.params.id;
      const { title, price, img } = req.body;
      let A = PARSED.filter((e) => { return e.id == productId; }); // => Finded ID
      let B = PARSED.filter((e) => { return e.id != productId; }); // => !Finded ID
      let C = []; // => New Array
      C.push(B);
      if (A[0].id == productId) { // => If product id match
        const updatedProd = (A[0] = { title, price, img, id: A[0].id }); // => Product update
        C[0].push(updatedProd);
        const sorted = C[0].sort(function (a, b) { return a.id - b.id;}); // => Sorting from < to > by ID
        fs.writeFileSync(this.productRoute, JSON.stringify(sorted, 8, '\t'));
        res.status(200).send({Msg: 'Product updated successfully'});
        next();
      } else { return; }
    } catch (error) { res.send({ Error: 'Producto no encontrado' }); }
  }   /*===== // =====*/

  async deleteById(req, res, next){
    try {
      const productId = req.params.id;
      const PARSED = JSON.parse(fs.readFileSync(this.productRoute, 'utf-8'));
      let A = PARSED.filter((x) => { return x.id !== parseInt(productId); });
      let B = PARSED.filter((x) => { return x.id == productId; });
      const STRING = JSON.stringify(A, 8, '\t');
      if (B[0].id == productId) {
        fs.writeFileSync(this.productRoute, STRING);
        res.status(204).json({Message: 'Product deleted'});
        next();
      }return;
    } catch (error) { res.status(400).json({ Error: `Product ID:${req.params.id} doesn't exist` }); }
  }   /*===== // =====*/

  /*======================================= CART METHODS =======================================*/

  async cartCreate(req, res){
    if(fs.existsSync(this.cartRoute)){
      /*===== Reading =====*/
      const parsed = JSON.parse(fs.readFileSync(this.cartRoute, 'utf-8'));

      /*===== Products Array =====*/
      let newCart = { id: uniqueID(), timestamp: Date.now(), products: []};
      parsed.push(newCart);

      /*===== Save an Cart Array =====*/
      fs.writeFileSync(this.cartRoute, JSON.stringify(parsed, 8, '\t'));

      res.status(200).json({Message: 'New Cart created', id: newCart.id});
    } else {
      fs.writeFileSync(this.cartRoute, '[]', (err) => {
        if(err){ console.log('Error:',err); }
        else{ return; }
      });
      return res.status(200).json({Message: 'Cart File created'});
    }
  }   /*===== // =====*/

  async getCart(req, res){
    try{
      /*===== Reading =====*/
      const parsed = JSON.parse(fs.readFileSync(this.cartRoute, 'utf-8'));
      /*===== Params =====*/
      const { id } = req.params;
      let A = parsed.filter((e) => e.id.toString() === id );
      res.status(200).send(A);
    } catch(err){ res.status(400).send({ err: 'Product not found'}); }
    
  }   /*===== // =====*/
  
  async deleteCart(req, res){
    try{
      /*==== Read =====*/
      const read = JSON.parse(fs.readFileSync(this.cartRoute, 'utf-8'));
      /*==== Params ======*/
      const id = req.params.id;
      /*==== Filter ======*/
      let filter = read.filter( (e) => e.id === parseInt(id) );
      if (filter[0].id === parseInt(id)){
        const A = read.filter( (e) => e.id !== parseInt(id) );
        fs.writeFileSync(this.cartRoute, JSON.stringify(A, '\t', 2));
        res.status(200).json({Message: 'Cart deleted succesfuly'});
      }
      else{res.status(404).json({Message: 'Cart does not exist'});}
    } catch(err){ res.status(404).send({err: "Cart doens't exist"})};
  }   /*===== // =====*/
  
  async addToCart(req, res){
    /*===== Cart =====*/
    let id = req.params.cartId;
    const parsedCart = JSON.parse(fs.readFileSync(this.cartRoute, 'utf-8'));
    let A = parsedCart.filter((e) => { return e.id === parseInt(id); });

    /*===== Products =====*/
    const parsedProds = JSON.parse(fs.readFileSync('./data/productos.txt', 'utf-8'));
    console.log(parsedProds);
    let productId = req.params.productId;
    let B = parsedProds.filter((e) => e.id == productId);
    /*===== Add Product to Array =====*/ A[0].products.push(B[0]);
    fs.writeFileSync(this.cartRoute, JSON.stringify(parsedCart, '\t', 2), 'utf-8');
    res.status(200).send({ Message: 'Product added to cart'});
  }   /*===== // =====*/

  async removeFromCart(req, res){
    // Cart
    let parsedCart = JSON.parse(fs.readFileSync(this.cartRoute, 'utf-8'));
    let id = req.params.cartId;
    let B = parsedCart.filter((e) => { return e.id === parseInt(id);});
     
    // Products
    let productId = req.params.productId;
    let A = B[0].products.filter((e) => { return e.id.toString() !== productId;});
    console.log(A);
 
    // Cart
    B[0].products = A;
    fs.writeFileSync(this.cartRoute, JSON.stringify(parsedCart, '\n', 2));
    res.send(B[0]);
  }   /*===== // =====*/  
}

module.exports = ContenedorMemory;
const fs = require('fs');
const dir = './data/carro.txt';
let ARR = [];
/*Array*/
//ARR.push(JSON.parse(read))
ARR.flat();

/*Unique ID */  
function uniqueID() { return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));}

class Container {
  constructor() {}

  create(req, res) {
    if (fs.existsSync(dir)) {
      /*===== Lectura ======*/
      let read = fs.readFileSync(dir, 'utf-8');
      let parse = JSON.parse(read);

      /*===== Array de Productos =====*/
      let newCart = { id: uniqueID(), timestamp: Date.now(), productos: []};
      parse.push(newCart);

      /*===== Para guardar un Array de Carritos =====*/
      fs.writeFileSync(dir, JSON.stringify(parse, 8, '\t'));

      res.status(200).json({ Message: 'New cart created', id: newCart.id});
    } else {
      fs.writeFile(dir, '[]', (err) =>
        err
          ? console.log(`Error: ${err}`)
          : console.log('{', dir, '} File Created succesfuly.')
      );
      //ARR.push({ title, price, img, id: 1 });
      res
        .status(200)
        .send({ Message: 'File Created & Product added under ID: 1' });
    }
  } // =>  Crea un carrito y devuelve su id.

  getById(req, res) {
    try {
      /*Read*/
      const DATA = fs.readFileSync(dir, 'utf-8');
      let parsed = JSON.parse(DATA);

      /*Params*/
      const cartId = req.params.id;

      let A = parsed.filter((x) => { return x.id === parseInt(cartId);});

      res.send(A);
    } catch (error) { res.send({ error: 'Product not found' });}
  } // => Me permite listar todos los productos guardados en el carrito.


  delete(req, res) {
    try{
      /*==== Read =====*/
      const read = JSON.parse(fs.readFileSync(dir, 'utf-8'));
      /*==== Params ======*/
      const id = req.params.id;
      /*==== Filter ======*/
      let filter = read.filter( (e) => e.id === parseInt(id) );
      if (filter[0].id === parseInt(id)){
        const A = read.filter( (e) => e.id !== parseInt(id) );
        fs.writeFileSync(dir, JSON.stringify(A, '\t', 2));
        res.status(200).json({Message: 'Cart deleted succesfuly'});
      }
      else{res.status(404).json({Message: 'Cart does not exist'});}
    }
    catch(err){res.status(404).json({Message: 'Cart does not exist'});}
  } // => Elimina del archivo el objeto con el id buscado.

  addProd(req, res){

    /*===== Lectura =====*/
    const productsData = fs.readFileSync('./data/productos.txt', 'utf-8');
    const cartData = fs.readFileSync(dir, 'utf-8');

    /*===== Cart ID =====*/
    let id = req.params.id;
    let parsed = JSON.parse(cartData);
    let A = parsed.filter((e) => { return e.id === parseInt(id); });

    /*===== Products ID =====*/
    let productId = req.params.productId;
    let parse = JSON.parse(productsData);
    let B = parse.filter((e) => {return e.id == (productId);});

    /*===== Add Product to Array =====*/ A[0].productos.push(B[0]);
    fs.writeFileSync(dir, JSON.stringify(parsed, '\t', 2), 'utf-8');
    res.send(A);

  } // => Para incorporar productos al carrito por su id de producto

  removeProd(req, res){
    /*===== Reading ======*/
    let cartRead = fs.readFileSync(dir, 'utf-8');
    let parsedCart = JSON.parse(cartRead);

    /*===== Params =====*/
    let id = req.params.cartId;
    let id_prod = req.params.productId;
      
    // Cart
    let B = parsedCart.filter((e) => { return e.id === parseInt(id);});
    
    // Products
    let A = B[0].productos.filter((e) => { return e.id !== parseInt(id_prod);});

    // Cart
    B[0].productos = A;
    fs.writeFileSync(dir, JSON.stringify(parsedCart, '\n', 2));
    res.send(B[0]);
  }


}
//new Container().test();

exports.ARR = ARR;
module.exports = Container;

const fs = require('fs');
const DIR = './data/productos.txt';
const ARR = [];
/*Array*/
//ARR.push(JSON.parse(read))
ARR.flat();

/*Unique ID */
function uniqueID() { return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));}
class Container {
  constructor() {}

  save(req, res) {
    const { title, price, img } = req.body;
    /*Si el documento Existe...*/
    if (fs.existsSync(DIR)) {
      const data = fs.readFileSync(DIR, 'utf-8');
      const parsed = JSON.parse(data);
      /*Si contiene un Empty Array, crea el primer producto con ID 1*/
      if (parsed.length === 0) {
        let defaultProduct = `[{  "title": "${title}",\n \t"price": "${price}",\n \t"img": "${img}",\n \t"id": ${1}}\n]`;
        fs.writeFile(DIR, defaultProduct, (err) =>
          err
            ? console.log(`Error: ${err}`)
            : console.log('{', DIR, '} File Created succesfuly.')
        );
        ARR.push({ title, price, img, id: 1, description: '', }); // => */
        res.status(200).send(defaultProduct);
      } else if (parsed.length !== 0) {
        /*Si tiene longitud diferente a 0, crea el proximo producto con su longitud +1 */
        parsed.push({ title, price, img, id: parsed.length + 1,  description: '', timestamp: Date.now(), stock: 5, codigo: uniqueID()}); /* => */
        fs.writeFileSync(DIR, JSON.stringify(parsed, 8, '\t'));
        ARR.push({ title, price, img, id: ARR.length + 1, description: '', }); /* =>  */
        res.status(200).send({ title, price, img, id: parsed.length });
      } else {
        /*Este else no hace nada ya que no esta previsto que su longitud sea NaN o tenga otra condición*/
        return;
      }
      /*En caso que el documento no exista, lo crea y le otorga al producto el id 1*/
    } else {
      const { title, price, img } = req.body;
      let defaultProduct = `[{  "title": "${title}",\n \t"price": "${price}",\n \t"img": "${img}",\n \t"id": ${1}}\n]`;
      fs.writeFile(DIR, defaultProduct, (err) =>
        err
          ? console.log(`Error: ${err}`)
          : console.log('{', DIR, '} File Created succesfuly.')
      );
      ARR.push({ title, price, img, id: 1 });
      res
        .status(200)
        .send({ Message: 'File Created & Product added under ID: 1' });
    }
  } // Todos => Crear una funcion que me permita repetir el mismo código en el {else if} y el{else}

  async getAll(req, res) {
    /*Si el documento exíste lo lee y envía al cliente su contenido*/
    if (fs.existsSync(DIR) === true) {
      const data = fs.readFileSync(DIR, 'utf-8');
      await res.send(data);
    } else {
      /*Si no existe lo crea y muestra un array vacío*/
      fs.writeFileSync(DIR, '[]');
      const data = fs.readFileSync(DIR, 'utf-8');
      await res.send(data);
    }
  }

  getById(req, res, next) {
    try {
      const DATA = fs.readFileSync(DIR, 'utf-8');
      let parsed = JSON.parse(DATA);
      const productId = req.params.id;
      /*Filtro el id*/
      let A = parsed.filter((x) => {
        return x.id == productId;
      });
      /*Si el ID Matchea con el parametro, lo devuelvo al cliente / Si hay error el next pasa al Catch*/
      A[0].id == productId ? res.send(A) : next();
    } catch (error) {
      res.send({ Error: 'Producto no encontrado' });
    }
  } // => Devuelve el objeto con el parametro solicitado.

  deleteById(req, res, next) {
    try {
      const productId = req.params.id;
      const DATA = fs.readFileSync(DIR, 'utf-8');
      const PARSED = JSON.parse(DATA);
      let A = PARSED.filter((x) => {
        return x.id !== parseInt(productId);
      });
      //console.log(A[0].id)
      let B = PARSED.filter((x) => {
        return x.id == productId;
      });
      const STRING = JSON.stringify(A, 8, '\t');
      if (B[0].id == productId) {
        fs.writeFileSync(DIR, STRING);
        res.status(204).json({Message: 'Product deleted'});
        next();
      }
      return;
    } catch (error) {
      res.status(400).json({ Error: 'File cannot be deleted', }) && console.log(error);
    }
  } // => Elimína el objeto con el parametro solicitado.

  deleteAll() {
    try {
      fs.unlinkSync(DIR);
      console.log('{', DIR, '} File Deleted succesfuly.');
    } catch (e) {
      console.log('File cannot be deleted...', e);
    }
  } //              => Elimina del archivo el objeto con el id buscado.

  updateById(req, res, next) {
    try {
      const DATA = fs.readFileSync(DIR, 'utf-8');
      const PARSED = JSON.parse(DATA);

      const productId = req.params.id;
      const { title, price, img } = req.body;
      /*Finded*/
      let A = PARSED.filter((e) => {
        return e.id == productId;
      });
      /*Without*/
      let B = PARSED.filter((e) => {
        return e.id != productId;
      });
      /*NewArray*/
      let C = [];
      /*Añado al array el filtrado sin el producto buscado*/
      C.push(B);
      /*Si el producto coincide con el parametro*/
      if (A[0].id == productId) {
        /*Actualizo el producto con su body*/
        const updatedProd = (A[0] = { title, price, img, id: A[0].id });
        /*Pusheo el nuevo producto al array*/
        C[0].push(updatedProd);
        /*Ordeno los indices de menor a mayor según su ID*/
        const sorted = C[0].sort(function (a, b) {
          return a.id - b.id;
        });
        /*Sobreescribo el archivo con los datos antiguos y último cambio*/
        fs.writeFileSync(DIR, JSON.stringify(sorted, 8, '\t'));
        res.status(200).send();
        /*De haber error de índice el Next() va al Catch*/
        next();
      } else {
        return;
      }
    } catch (error) {
      res.send({ Error: 'Producto no encontrado' });
    }
  }
}
//new Container().test();

exports.ARR = ARR;
module.exports = Container;

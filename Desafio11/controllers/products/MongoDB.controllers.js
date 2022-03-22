/*==== Essentials ====*/
const mongoose = require('mongoose');
const config = require('../../utils/config');
/*====    //    ====*/
mongoose.connect(config.mongoDB.URL);

class ContenedorMongoDB{

  constructor(nombreColeccion, esquema){ this.coleccion = mongoose.model(nombreColeccion, esquema); }

  /*============================= Regular Methods =============================*/
  // C
  async createProduct (req, res) {
    const { title, price, img } = req.body;
    const myObj = { title, price, img, description: ''};
    try{ return await this.coleccion.create(myObj) && res.status(200).send({Msg: 'Product added to DB'});  }
    catch (error){ console.log(error); return res.status(500).json(error); }
  }
  // R
  async getAll(){  
    try { 
      const doc = await this.coleccion.find({});
      return doc;
    }
    catch(err){ console.log(err); }
  }
  //
  /*============================= By ID Methods =============================*/
  async getById(req, res){
    const { id } = req.params;
    const doc = await this.coleccion.findById(id);
    return res.send(doc);
  }
  // U
  async updateById(req, res){
    const updatedProduct = await this.coleccion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );
    res.status(200).json(updatedProduct);
  }
  // D
  async deleteById(req, res){
    const {id} = req.params;
    await this.coleccion.findByIdAndDelete(id);
    res.status(204).send(); }
}

module.exports = ContenedorMongoDB;
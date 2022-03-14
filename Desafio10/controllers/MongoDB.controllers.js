/*==== Essentials ====*/
const mongoose = require('mongoose');
const config = require('../utils/config');
/*====    //    ====*/
const URL = config.mongoDB.URL;
mongoose.connect(URL);

class ContenedorMongoDB{
  constructor(collectionName, schema){ this.collection = mongoose.model(collectionName, schema); }

  /*============================= Regular Methods =============================*/
  // C
  async createProduct (req, res) {
    const { title, description, price } = req.body;
    console.log(this.collection)
    try{
      const savedProd = await this.collection.save(title, description, price);
      res.status(201).json(savedProd);
    }
    catch (error){
      console.log(error);
      return res.status(500).json(error);
    }
  }
  // R
  async getAll(res){
    try { const products = await this.collection.find({}); res.send(products); console.log(products); }
    catch(err){ console.log(err); }
  }
  //
  /*============================= By ID Methods =============================*/
  // R
  async getById(req, res){
    const { productId } = req.params;
    const product = await this.collection.findById(productId);
    res.status(200).json(product);
  }
  // U
  async updateById(req, res){
    const updatedProduct = await this.collection.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true
      }
    );
    res.status(200).json(updatedProduct);
  }
  // D
  async deleteById(req, res){
    const {productId} = req.params;
    await this.collection.findByIdAndDelete(productId);
    res.status(204).send(); }
}
const exportedContainer = new ContenedorMongoDB();
module.exports = exportedContainer;
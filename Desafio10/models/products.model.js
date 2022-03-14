const {Schema, model} = require('mongoose');
const reqString = { type: String, required: true};
const ProductsSchema = new Schema({
  title: reqString,
  desription: reqString,
  price: {type: Number, required: true},
});
module.exports = model('Products', ProductsSchema);
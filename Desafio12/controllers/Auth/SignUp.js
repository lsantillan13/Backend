/*==== Essentials ====*/
const mongoose = require('mongoose');
const config = require('../../utils/config');
/*====    //    ====*/
mongoose.connect(config.mongoDB.URL);

class AuthMongoDB{

  constructor(nombreColeccion, esquema){ this.coleccion = mongoose.model(nombreColeccion, esquema); }
  async signUp(req, res){  
    const {username} = req.body;
    let newUser = { username };
    try{ return await this.coleccion.create(newUser) && res.status(200).send({Msg: 'Product added to DB'});  }
    catch (error){ return res.status(500).json(error); }
  }
  /*signIn(){}*/
}
module.exports = AuthMongoDB;

/*
*/
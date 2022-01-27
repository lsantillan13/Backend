const express = require('express');
const router = express.Router();
const Products = require('../class');
const fs = require('fs');
/*------------------------------------------------------------------Regular requests--------------------------------------------------------------------------*/
//                                                               /*----- POST -------*/
const newProd = new Products;
router.post('/productos', newProd.save);

//                                                               /*----- GET -------*/
router.get('/productos', (req, res) => {
    const data = fs.readFile('./data/productos.txt', 'utf-8', function (err, content){
        const stringed = JSON.stringify(content)
        if(err) {console.log(err)}
        return stringed
    })   
    console.log(data)
    res.status(200).send(data);
});

//router.get('/productos/:id', (request, response) => { });
/*---POST--*/

//router.post('/productos', (request, response) => { });
/*---PUT---*/

//router.put('/productos/:id', (request, response) => { });
/*-DELETE-*/

// router.delete('/productos/:id', (request, response) => { });

module.exports = router;
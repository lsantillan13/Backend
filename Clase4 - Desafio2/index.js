const fs = require('fs');
const ARR = [];
const DIR = './productos.txt';

class Container{
    constructor(){}
/*Methods*/
    create(){
        fs.writeFile(DIR, "[]", (err) => {
            err ? console.error(`Error :${err}`) : console.log(`New file created at ${DIR}`);})
    }//             => Al llamar al metodo deleteAll() los siguientes métodos daran ERROR
    save(title, price, thumbnail) {
        fs.readFile(DIR, 'utf-8', function (err, content){
        if (err) {if (err.code === 'ENOENT'){fs.writeFile(DIR, 'utf-8')}}
        else {null}
        });

        let data = fs.readFileSync('./productos.txt', 'utf-8');
        let parsed = JSON.parse(data);
        parsed.length === 0 ? parsed = [{title, price, thumbnail, id: 1}] : parsed.push({title, price, thumbnail, id: parsed.length + 1})
        console.log(`Product added with Id: ${parsed.length}`)
        fs.writeFileSync('./productos.txt', JSON.stringify(parsed, 8, '\t'))
    }//              =>  Recibe un objeto, lo guarda en el archivo y devuelve el id asignado.
    getById(){

    }//              => Recibe un ID y devuelve el objeto con ese id, o NULL si no está.
    getAll(){
        fs.readFile(DIR, 'utf-8', function (err, content){
            if (err) {if (err.code === 'ENOENT'){ console.log(ARR)}}
            else {console.log(content)}
        });
    }//              => Devuelve un array con los bojetos presentes en el archivo.
    deleteById(){

    }//              => Elimina del archivo el objeto con el id buscado.
    deleteAll(){
        try{ fs.unlinkSync('./productos.txt');
        console.log('File deleted succesfully')}
        catch(e){console.log('File cannot be deleted...', e)}
    }//              => Elimina del archivo el objeto con el id buscado.

}

const PRODUCTOS = new Container();
//PRODUCTOS.create()
    //
//PRODUCTOS.save('Escuadra', 123.45, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png');
PRODUCTOS.save('Producto 0', 0, 'www.algo.com')
    //
//PRODUCTOS.getById(3) 
    //
//PRODUCTOS.getAll();
    //
//PRODUCTOS.DeleteById(3);
    //
//PRODUCTOS.deleteAll();
    //
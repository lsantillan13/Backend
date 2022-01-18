const fs = require('fs');
const DIR =  './data/productos.txt';
const ARR = [];

//
function uniqueID() { return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}

class Container{
    constructor(){}
/*Mis métodos*/
    auto(){fs.writeFile(DIR, '[]', err => err ? console.log(`Error: ${err}`) : console.log('{', DIR, '} File Created succesfuly.'))};

/*Métodos para el desafio*/
    save(title, price, thumbnail) {
        fs.readFile(DIR, 'utf-8', function (err, content){
        if (err) {if (err.code === 'ENOENT'){fs.writeFile(DIR, 'utf-8')}}
            else {null}
        });
        /**/
        let data = fs.readFileSync('./data/productos.txt', 'utf-8');
        let parsed = JSON.parse(data);
        parsed.length === 0 ? parsed = [{title, price, thumbnail, id: 1}] : parsed.push({title, price, thumbnail, id: parsed.length + 1})
        console.log(`Product added with Id: ${parsed.length}`)
        fs.writeFileSync('./data/productos.txt', JSON.stringify(parsed, 8, '\t'))
    }//              =>  Recibe un objeto, lo guarda en el archivo y devuelve el id asignado.


    getById(param){
        const data = fs.readFileSync(DIR, 'utf-8');
            let parsed = JSON.parse(data);
            var A = parsed.filter(x => {return x.id === param})
            var B = parsed.filter(x => {return x.id != param})
            try{
                if(A[0].id === param)console.log(`-------Item Found-------`, '\n', A, '\n')
            }
            catch(err){
                console.log(`-------Can't Found-------`,
                "\n Function can't found item under ID:",param)
            }
    }//              => Recibe un ID y devuelve el objeto con ese id, o NULL si no está.


    getAll(req, res){
        const data = fs.readFile(DIR, 'utf-8', function (err, content){
            const parsed = JSON.parse(content);
            if (err) {if (err.code === 'ENOENT'){verifyContent(parsed)}}
            res.json(parsed)
        });
    }//              => Devuelve un array con los bojetos presentes en el archivo.

    deleteById(param){
        const data = fs.readFileSync(DIR, 'utf-8');
            let parsed = JSON.parse(data);
            var B = parsed.filter(x => { return x.id === param });
            var A = parsed.filter(x => { return x.id != param });
            let string = JSON.stringify(A, 8, '\t');
        fs.writeFile(DIR, string, (err) => {
            if (err) console.log({STATUS_CODE: 404});
            console.log(`-------Item Deleted------- \n`,B)
            setTimeout(function(){console.log('-------Item/s Remaining-------','\n', JSON.parse(string), '\n')}, 2000);
        });
    }//              => Elimina del archivo el objeto con el id buscado.


    deleteAll(){
        try{ fs.unlinkSync(DIR);
        console.log('{', DIR, '} File Deleted succesfuly.')}
        catch(e){console.log('File cannot be deleted...', e)}
    }//              => Elimina del archivo el objeto con el id buscado.

    randomProduct(req, res){
    fs.readFile('./data/productos.txt', 'utf-8', (err, content) => {                                                                         
    let parsed = JSON.parse(content)                                                                                                     
        if(err){res.json('Msg: An error has ocurred.')}
        else{ let Random = Math.random()*parsed.length;                                                                                      
        Random = Math.floor(Random + 1)                                                                                                    
        const Filter = parsed.filter(e => e.id === Random);                                                                                
        res.json(Filter)
    }})
    }
}
const PRODUCTOS = new Container();

const reset = (param1, param) => {
    switch (param1){
        case 0:
            PRODUCTOS.deleteAll()
            break;
        case 1:
            PRODUCTOS.auto();
            break;    
        case 2:
            PRODUCTOS.save('Escuadra', 123.45, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png');
            PRODUCTOS.save('Calculadora', 234.56, 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png');
            PRODUCTOS.save('Globo Terráqueo', 345.67, 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png');
            PRODUCTOS.getAll();
            break;
        case 'Read':
            PRODUCTOS.getAll();
            break;
        case 'Create':
            PRODUCTOS.save('Escuadra', 123.45, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png');
            PRODUCTOS.save('Calculadora', 234.56, 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png');
            PRODUCTOS.save('Globo Terráqueo', 345.67, 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png');
            break;
        default: 
            console.log('Parameter error.')
}}
/**************************************************************************************************************************************************************/
//reset('Read')

/*Function usage:*/
    //reset(N)
        // N = 0 => For file deletion.
        // N = 1 => For 're-create' File.
        // N = 2 => For Create and Read
        // N = 'Read' => To read file.
        // N = 'Create' => To automatically add 3 example products.

/*ByID Methods*/
    //PRODUCTOS.getById()
    //PRODUCTOS.deleteById();
//
//PRODUCTOS.save('Escuadra', 123.45, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png');
//PRODUCTOS.save('Calculadora', 234.56, 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png');
//PRODUCTOS.save('Globo Terráqueo', 345.67, 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png');

/**************************************************************************************************************************************************************/

module.exports = Container;
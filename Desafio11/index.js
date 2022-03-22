if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
/*================== // ==================*/ // Server
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
/*================== // ==================*/ // Initialization
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
/*================== // ==================*/ // Libraries / etc
const exphbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
/*===== // =====*/ // Messages model
//const { Sqlite } = require('./utils/config');
//const messagesTable = 'messages';

/*================== // ==================*/ // Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces', 8);
app.use(cors());
app.use(morgan('dev'));
/*================== // ==================*/ // Engines - Utils
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsdir: path.join(app.get('views'), 'partials'),
  })
);
app.set('view engine', 'hbs');
/*================== // ==================*/ // Routes
const productsRoutes = require('./Router/products.routes');
//const Model = require('./db/model');
//const Message = new Model(config.Sqlite, messagesTable);
//============ API Routes ===========// // API
/*                                   */
app.use('/api', productsRoutes);
app.get('/formulario');
//=========  Client Routes  =========// // API
/*                                   */
app.get('/', (req, res) => { res.render('home');});

//============ Socket IO ============//
io.on('connection', (socket) =>{

  socket.on('products:send', (data) => { // => Recibo producto
    io.sockets.emit('products:send', data); // => Devuelvo producto
  });

  socket.on('chat:message', (data) => { // => Recibo el Mensaje
    //Message.saveMessage(data);
    io.sockets.emit('chat:message', data); // => Devuelvo el Mensaje
  });
  /*Messages*/
  socket.on('chat:typing', (data) => { // => Recibo el usuario
    socket.broadcast.emit('chat:typing', data); // => Devuelvo el usuario
  });

});
//app.get('/mensajes',  (req, res ) => { /*Message.getMessages(req, res);*/ });

//=============================================================== Desafio 22  ===============================================================//
//============ Faker.JS ============//
const {faker} = require('@faker-js/faker');
app.use('/api/productos-test/', (req, res) => { res.render('test'); });
let getImage = () => { return faker.image.image(); };

app.use('/api/productos-get', (req, res) => { const prod = [
  {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    img: getImage(),
  },{
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    img: getImage(),
  },{
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    img: getImage(),
  },{
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    img: getImage(),
  },{
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    img: getImage(),
  }
]; res.send(prod); });
//============ Normalizr ============//

const { normalize, schema} = require('normalizr');

const message = new schema.Entity('message');
const user = new schema.Entity('user');

const messagesList = new schema.Entity('messageList',{ author: user, message: message });

const messages = new schema.Entity('messages',{ messages: [messagesList]} );

let messag = {
  id: 1,
  user: 'Lautaro',
  message: 'hola'
};

const normalized = normalize(messag, messages);
console.log(normalized);





//--------------------------------- Server ---------------------------------//
const server = httpServer.listen(app.get('port'), () => { console.log('Server on port', app.get('port')); });
server.on('error',error => { console.log('Error en el servidor', error); });


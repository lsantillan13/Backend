if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
/*================== // ==================*/
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
/*================== // ==================*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
/*================== // ==================*/
const exphbs = require('express-handlebars');
//const fs = require('fs');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
/*================== // ==================*/
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces', 8);
app.use(cors());
app.use(morgan('dev'));
/*================== // ==================*/
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
/*================== // ==================*/
const productsRoutes = require('./Router/products.routes');
//============ API Routes ===========//
/*                                   */
app.use('/api', productsRoutes);
app.get('/formulario');
//=========  Client Routes  =========//
/*                                   */
app.get('/', (req, res) => { res.render('home');});

//============ Socket IO ============//

let mensajes = [];
io.on('connection', (socket) =>{
  console.log(`alguien se está conectando: ${socket.id}`);

  socket.on('products:send', (data) => { // => Recibo producto
    io.sockets.emit('products:send', data); // => Devuelvo producto
  });

  socket.on('chat:message', (data) => { // => Recibo el Mensaje
    io.sockets.emit('chat:message', data); // => Devuelvo el Mensaje
    const mensaje = {user: data.username, message: data.message};
    let stringed = JSON.stringify(mensajes, 8, '\t');
    mensajes.push({mensaje});
    fs.writeFile('./data/mensajes.txt', stringed,  (err) => {
      err ? console.log('err') : console.log('message appended successfully');
    });
  });

  socket.on('chat:typing', (data) => { // => Recibo el usuario
    socket.broadcast.emit('chat:typing', data); // => Devuelvo el usuario
  });

});
//--------------------------------- Server ---------------------------------//
const server = httpServer.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

server.on('error',error => {
  console.log('Error en el servidor', error);
});
window.onload = function(){ // => When document is ready...
  let socket = io.connect();
  
  /*===== Formulary Handling =====*/
  const handleSubmit = async(e) => {
    e.preventDefault();
    const config = { header: {'Content-Type': 'application/json'},};
    try{
      let title = document.querySelector('#title').value;
      let price = document.querySelector('#price').value;
      let img = document.querySelector('#img').value;
      await axios.post('http://localhost:8080/api/productos', { title, price, img }, config);
      setTimeout(() => {
        document.querySelector('#title').value = '';
        document.querySelector('#price').value = '';
        document.querySelector('#img').value = '';
      }, 1500);
    }catch(error){ console.log(error);}
  };
  document.getElementById('form').addEventListener('submit', handleSubmit);

  /*====== Products Table Handling ======*/
 
  /* DOM Manipulation */
  const formBtn = document.getElementById('btn');
  const table = document.getElementById('myTable');
  /*Fetching products when document loads*/
  (async function(){
    try{
      const data = await axios.get('http://localhost:8080/api/productos');
      const productos = data.data;

      productos.forEach(e => {
        /*===== Creation =====*/
        let tableBody = document.getElementById('tb');
        let productName = document.createElement('td');
        let productPrice = document.createElement('td');
        let productPicture = document.createElement('td');
        let tableRow = document.createElement('tr');
        /*===== Manipulation =====*/
        productName.innerHTML += `<p class="parrafo"> ${e.title} </p>`;
        productPrice.innerHTML += `<p class="parrafo"> ${e.price} </p>`;
        productPicture.innerHTML += `<p class="parrafo"> <img src="https://source.unsplash.com/random/300x200" alt="image_of_${e.title}" class="product_image"/> </p>`;
        /*===== Appending to Table =====*/
        tableBody.appendChild(tableRow);
        tableRow.appendChild(productName);
        tableRow.appendChild(productPrice);
        tableRow.appendChild(productPicture);
        table.appendChild(tableBody);
        
      });
    }
    catch(err){console.log(err);}
  })();
  

  /*Event Handler*/
  formBtn.addEventListener('click', function () {
    let title = document.querySelector('#title').value;
    let price = document.querySelector('#price').value;
    let img = document.querySelector('#img').value;
    title !== '' && price !== '' && img !== '' &&
    socket.emit('products:send', (product) = {
      title,
      price,
      img
    });
  });
  socket.on('products:send', function (data){
    let tbody = document.getElementById('tb');
    let tdName = document.createElement('td');
    let tdPrice = document.createElement('td');
    let tdPicture= document.createElement('td');
    let tr = document.createElement('tr');
    /*Inner*/
    tdName.innerHTML += `<p class="parrafo"> ${data.title} </p>`;
    tdPrice.innerHTML += `<p class="parrafo"> ${data.price}</p´>`;
    tdPicture.innerHTML += `<p> <img src="https://source.unsplash.com/random/300x200?random" alt="image_of_${data.title}" class="product_image"/> </p>`;
    //tdPicture.innerHTML += `<p> <img src="${data.img}" alt="image_of_${data.title}" class="product_image"/> </p>`;
    for (product in data){
      /*Append*/
      tbody.appendChild(tr);
      tr.appendChild(tdName);
      tr.appendChild(tdPrice);
      tr.appendChild(tdPicture);
      table.appendChild(tbody);
    }
  });

  /*===== Fecha =====*/
  let newDate = () => {return new Date();};

  let getTheDate = () => {
    /*Time*/
    let hours = newDate().getHours().toString().length < 2 ? `0${+ newDate().getHours()}`: newDate().getHours();
    let minutes = newDate().getMinutes().toString().length < 2 ? `0${+ newDate().getMinutes()}` : newDate().getMinutes();
    let secs =  newDate().getSeconds().toString().length < 2 ? `0${+ newDate().getSeconds()}` :  newDate().getSeconds();
    let mainTime = `${hours}:${minutes}:${secs}`;
    /*Date*/
    let month = newDate().getMonth();
    let days = newDate().getDate();
    let year = newDate().getFullYear();
    let mainDate = `${days}/${month}/${year}`;
    let theWholeThing = ` [${mainDate} ${mainTime}]: `;
    return theWholeThing;
  };

  /*===== SocketIO Handling =====*/
  
  let message = document.getElementById('message');
  let userEmail = document.getElementById('userEmail');
  let output = document.getElementById('output');
  let actions = document.getElementById('actions');
  let btn = document.getElementById('send');

  (async function(){
    /*Vars*/
    let table = [];
    let response = await axios.get('http://localhost:8080/mensajes');
    const data = response.data;
    const user = new normalizr.schema.Entity('users');
    const mySchema = [{ users: [user] }];
    const normalizedData = normalizr.normalize(data, mySchema);
    let Data = normalizedData.result;
    /*Functionality*/
    for (let i = 0; i < Data.length; i++){let content = { id: Data[i].id, author: Data[i].author, message: Data[i].message }; table.push(content); }
    table.forEach(e => {
      output.innerHTML += `<p> <strong>${e.author.id}</strong> <i class="notItalic">${e.message.date}</i> : <i>${e.message.message}</i> </p>`;
    });
  })(); // =>  Normalizr

  
  message !== '' && userEmail !== '' && btn.addEventListener('click', function() {
    socket.emit('chat:message', {
      author: {
        id: userEmail.value,
        name: 'userName',
        lastName: 'userLastName',
        age: 'userAge',
        nick: 'userNick',
        avatar: 'userAvatar'
      },
      message:{
        message: message.value,
        date: getTheDate()
      }
    });
  }); // => Anulando envio de mensajes si no hay mensaje o email


  message.addEventListener('keypress', function(){
    socket.emit('chat:typing', userEmail.value);
  }); // => ... Está escribiendo.


  socket.on('chat:message', function(data){
    actions.innerHTML = '';
    output.innerHTML += `<p> <strong>${data.author.id}</strong> <i class="notItalic">${getTheDate()}</i> : <i>${data.message.message}</i> </p>`;
  }); // =>  Envio de mensajes

  socket.on('chat:typing', function(data){
    actions.innerHTML = `<p><em>${data} está escribiendo...</em></p>`;
  });
};
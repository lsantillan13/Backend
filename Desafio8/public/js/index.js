
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
        productPicture.innerHTML += `<p class="parrafo"> <img src="${e.img}" alt="image_of_${e.title}" class="product_image"/> </p>`;
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
    tdPicture.innerHTML += `<p> <img src="${data.img}" alt="image_of_${data.title}" class="product_image"/> </p>`;
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
  let username = document.getElementById('username');
  let output = document.getElementById('output');
  let actions = document.getElementById('actions');
  let btn = document.getElementById('send');

  (async function(){
    let response = await axios('http://localhost:8080/mensajes');
    const data = response.data;
    data.forEach(e => {
      output.innerHTML += `<p> <strong>${e.username}</strong> <i class="notItalic">${getTheDate()}</i> : <i>${e.message}</i> </p>`;
    });

  })();

  message !== '' && username !== '' && btn.addEventListener('click', function() {
    socket.emit('chat:message', {
      message: message.value,
      username: username.value,
      date: getTheDate()
    });
  });

  message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value);
  });

  socket.on('chat:message', function(data){
    actions.innerHTML = '';
    output.innerHTML += `<p> <strong>${data.username}</strong> <i class="notItalic">${getTheDate()}</i> : <i>${data.message}</i> </p>`;
  });

  socket.on('chat:typing', function(data){
    actions.innerHTML = `<p><em>${data} está escribiendo...</em></p>`;
  });
};
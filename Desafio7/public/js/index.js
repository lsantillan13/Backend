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
  /*Creation*/
  const tb = document.createElement('tbody');
  const tdName = document.createElement('td');
  const tdPrice = document.createElement('td');
  const tdPicture= document.createElement('td');
  const addToCart = document.createElement('td');

  
  /* DOM Manipulation */
  const formBtn = document.getElementById('btn');
  const table = document.getElementById('myTable');
  /*Event Handler*/
  formBtn.addEventListener('click', function () {
    let title = document.querySelector('#title').value;
    let price = document.querySelector('#price').value;
    let img = document.querySelector('#img').value;
    socket.emit('products:send', (product) = {
      title,
      price,
      img
    });
  });

  /*===== Fecha =====*/
  let newDate = () => {return new Date();};

  let getTheDate = () => {
    /*Time*/
    let hours = newDate().getHours().toString().length < 2 ? `0${+ newDate().getHours}`: newDate().getHours();
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

  socket.on('products:send', function (data){
    /*Add to Cart*/
    const handleAddToCart = () => {};
    /*Inner*/
    tdName.innerHTML += `<p class="parrafo"> ${data.title} </p>`;
    tdPrice.innerHTML += `<p class="parrafo"> ${data.price}</p´>`;
    tdPicture.innerHTML += `<p class="parrafo"> <img src="${data.img}" alt="image_of_${data.title}" class="product_image"/> </p>`;
    /**/ addToCart.innerHTML += `<button onclick="${() => arrayPush}" id="addToCart">♥️</button>`; let arrayPush;
    for (product in data){
      const tr = document.createElement('tr');
      /*Append*/
      tb.appendChild(tr);
      tr.appendChild(tdName);
      tr.appendChild(tdPrice);
      tr.appendChild(tdPicture);
      tr.appendChild(addToCart);
      table.appendChild(tb);            
    }
  });
  /*===== SocketIO Handling =====*/
  
  let message = document.getElementById('message');
  let username = document.getElementById('username');
  let output = document.getElementById('output');
  let actions = document.getElementById('actions');
  let btn = document.getElementById('send');

  btn.addEventListener('click', function() {
    socket.emit('chat:message', {
      message: message.value,
      username: username.value
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
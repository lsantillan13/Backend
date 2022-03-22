window.onload = function() {
  const table = document.getElementById('test-table');
  (async function(){
    try{
      const data = await axios.get('http://localhost:8080/api/productos-get');
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

};


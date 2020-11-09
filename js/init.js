const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_DESAFIO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

const usernav = document.getElementById('usuario');
//const close = document.getElementById('cerrar');

let username = JSON.parse(localStorage.getItem('user'));

if (username != null){
    usernav.innerHTML = `<div class="dropdown" >
    <button class="btn btn-secondary dropdown-toggle dropbtn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    `+username[0].usuario +`
    </button>
  
    <div class="dropdown-content" aria-labelledby="dropdownMenuLink">
      <a  href="cart.html">Ver mi carrito</a>
      <a  href="my-profile.html">Mi perfil</a>
      <div class="dropdown-divider"></div>
      <a id="cerrar"  href="#">Cerrar sesión</a>
    </div>
  </div>`;
  
} else {
    usernav.innerHTML = '<a href="index.html" id="usuario">Iniciar sesión</a>';
}
const close = document.getElementById('cerrar');
close.addEventListener('click', function(){
    localStorage.clear('user');
    location.href='index.html';
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
const usernav = document.getElementById('usuario');
const close = document.getElementById('cerrar');

let username = JSON.parse(localStorage.getItem('user'));

if (username != null){
    usernav.innerHTML = '<a id="usuario" style="color:#4bcffa;">'+username[0].usuario +'</a>';
} else {
    usernav.innerHTML = '<a href="index.html" id="usuario">Iniciar sesión</a>';
}
close.addEventListener('click', function(){
    localStorage.clear('user');
    location.href='index.html';
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});
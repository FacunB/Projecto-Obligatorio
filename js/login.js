const user = document.getElementById("user");
const password = document.getElementById("contra");
const form = document.getElementById("login");

form.addEventListener("submit", function(event){
    event.preventDefault();
    
    let users = Array (
        {
            usuario: user.value,
            contraseña: password.value,
        
        }
    );
    localStorage.setItem('user', JSON.stringify(users));
    location.href='page.html';     
});



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});
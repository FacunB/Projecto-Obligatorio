const primerNombre = document.getElementById("primerNombre");
const primerApellido = document.getElementById("primerApellido");
const segundoNombre = document.getElementById("segundoNombre");
const segundoApellido = document.getElementById("segundoApellido");
const correo = document.getElementById("correo");
const edad = document.getElementById("edad");
const contacto = document.getElementById("contacto");
const formulario = document.getElementById("form");

let SUCCESS_MSG = "¡Se guardaron los cambios con éxito! :)";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
let msgToShowHTML = document.getElementById("resultSpan");
let msgToShow = "";


formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    let perfil = Array(
        {
            primerNombre: primerNombre.value,
            segundoNombre: segundoNombre.value,
            primerApellido: primerApellido.value,
            segundoApellido: segundoApellido.value,
            correo: correo.value,
            edad: edad.value,
            contacto: contacto.value,

        }
    );
    localStorage.setItem('miPerfil', JSON.stringify(perfil));
});

let miPerfil = JSON.parse(localStorage.getItem('miPerfil'));

if (miPerfil != null) {
    document.getElementById("primerNombre").value = miPerfil[0].primerNombre;
    document.getElementById("segundoNombre").value = miPerfil[0].segundoNombre;
    document.getElementById("primerApellido").value = miPerfil[0].primerApellido;
    document.getElementById("segundoApellido").value = miPerfil[0].segundoApellido;
    document.getElementById("correo").value = miPerfil[0].correo;
    document.getElementById("contacto").value = miPerfil[0].contacto;
    document.getElementById("edad").value = miPerfil[0].edad;
}

/*
getProfile(miPerfil) {
    document.getElementById("primerNombre").value = miPerfil[0].primerNombre;
    document.getElementById("segundoNombre").value = miPerfil[0].segundoNombre;
    document.getElementById("primerApellido").value = miPerfil[0].primerApellido;
    document.getElementById("segundoApellido").value = miPerfil[0].segundoApellido; 
    document.getElementById("correo").value = miPerfil[0].correo;
    document.getElementById("contacto").value = miPerfil[0].contacto;
    document.getElementById("edad").value = miPerfil[0].edad; 
    
}*/


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    
    formulario.addEventListener("submit", function (e) {

        
        let infoMissing = false;

        //Quito las clases que marcan como inválidos
        primerNombre.classList.remove('is-invalid');
        primerApellido.classList.remove('is-invalid');
        correo.classList.remove('is-invalid');
        edad.classList.remove('is-invalid');
        contacto.classList.remove('is-invalid');

        //Se realizan los controles necesarios,
        //En este caso se controla que se haya ingresado los campos obligatorios.

        //Consulto por el nombre 
        if (primerNombre.value === "") {
            primerNombre.classList.add('is-invalid');
            infoMissing = true;
            document.getElementById("ocultarNombre").hidden = false;
        }

        //Consulto por el apellido
        if (primerApellido.value === "") {
            primerApellido.classList.add('is-invalid');
            infoMissing = true;
            document.getElementById("ocultarApellido").hidden = false;
        }

        //Consulto por el correo
        if (correo.value === "") {
            correo.classList.add('is-invalid');
            infoMissing = true;
            document.getElementById("ocultarCorreo").hidden = false;
        }

        //Consulto por la Edad
        if (edad.value === "") {
            edad.classList.add('is-invalid');
            infoMissing = true;
            document.getElementById("ocultarEdad").hidden = false;
        }

        //Consulto el contacto
        if (contacto.value === "") {
            contacto.classList.add('is-invalid');
            infoMissing = true;
            document.getElementById("ocultarContacto").hidden = false;
        }



        if (!infoMissing) {
            //Aquí ingresa si pasó los controles, irá a enviar
            //la solicitud para crear la publicación.
                
                msgToShow = SUCCESS_MSG;
                document.getElementById("alertResult").classList.add('alert-success');
                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
               
        }else if (infoMissing == true) {
                  msgToShow = ERROR_MSG;
                    document.getElementById("alertResult").classList.add('alert-danger');
                }

                msgToShowHTML.innerHTML = msgToShow;                
                document.getElementById("alertResult").classList.add("show");
            });


        

        //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
        if (e.preventDefault) e.preventDefault();
        return false;
    });


   /* var imagen = document.getElementById("imagenPerfil");

    imagen.addEventListener("load", function () {
        var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");
    
        // Make sure canvas is as big as the picture
        imgCanvas.width = imagen.width;
        imgCanvas.height = imagen.height;
    
        // Draw image into canvas element
        imgContext.drawImage(imagen, 0, 0, imagen.width, imagen.height);
    
        // Get canvas contents as a data URL
        var imgAsDataURL = imgCanvas.toDataURL("image/png");
    
        // Save image into localStorage
        try {
            localStorage.setItem("imagen", imgAsDataURL);
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
    }, false); */

    // localStorage with image
var storageFiles = JSON.parse(localStorage.getItem("storageFiles")) || {},
imagen = document.getElementById("imagenPerfil"),
storageFilesDate = storageFiles.date,
date = new Date(),
todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();

// Compare date and create localStorage if it's not existing/too old   
if (typeof storageFilesDate === "undefined" || storageFilesDate < todaysDate) {
// Take action when the image has loaded
imagen.addEventListener("load", function () {
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

    // Make sure canvas is as big as the picture
    imgCanvas.width = imagen.width;
    imgCanvas.height = imagen.height;

    // Draw image into canvas element
    imgContext.drawImage(imagen, 0, 0, imagen.width, imagen.height);

    // Save image as a data URL
    storageFiles.imagen = imgCanvas.toDataURL("image/png");

    // Set date for localStorage
    storageFiles.date = todaysDate;

    // Save as JSON in localStorage
    try {
        localStorage.setItem("storageFiles", JSON.stringify(storageFiles));
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }
}, false);

// Set initial image src    
imagen.setAttribute("src", "https://i.ibb.co/yQxVfTF/biteljus.jpg");
}
else {
// Use image from localStorage
imagen.setAttribute("src", storageFiles.imagen);
}
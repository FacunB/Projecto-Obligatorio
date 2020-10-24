let moneda = "UYU";
let porcentajeEnvio = 0.15;
let metodoDePago = false;

function updateTotalCosts() {
    let unitProductCostHTML = document.getElementById("productCostText");
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let unitCostToShow = MONEY_SYMBOL + productCost;
    let comissionToShow = Math.round((comissionPercentage * 100)) + PERCENTAGE_SYMBOL;
    let totalCostToShow = MONEY_SYMBOL + (Math.round(productCost * comissionPercentage * 100) / 100);

    unitProductCostHTML.innerHTML = unitCostToShow;
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}

//Funcion para ver si los metodos de pago estan piola
function checkMethod() {
    let numerotarjeta = document.getElementById("cardnum").value;
    let codigoTarjeta = document.getElementById("securitycode").value;
    let vencimientoTarjeta = document.getElementById("vencimiento").value;
    let numerodeCuenta = document.getElementById("numeroCuenta").value;

    if ((numerotarjeta && codigoTarjeta && vencimientoTarjeta) !== "") {
        metodoDePago = true;
    } else {
        if (numerodeCuenta !== "") {
            metodoDePago = true;
        } else {
            metodoDePago = false;
        }
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_DESAFIO_URL).then(function (resultObjeto) {
        if (resultObjeto.status === "ok") {
            objeto = resultObjeto.data;
            array = objeto.articles;

            let htmlContentToAppend = ""; //aca se muestran los objetos del carro

            for (let i = 0; i < array.length; i++) {
                let cosas = array[i];

                if (cosas.currency == "USD") {
                    htmlContentToAppend += `<tbody>
                    <tr>
                      <td><img style="display:block; height: 110px;" src="`+ cosas.src + `" alt="imagen de producto"></th>
                      <td>`+ cosas.name + `</th>
                      <td id="costo-`+ i + `">` + moneda + " " + (cosas.unitCost * 40) + `</th>
                      <td><input style="width: 5em;" type="number" class="form-control" id="cantidad-`+ i + `" placeholder="" required="" value="` + cosas.count + `" min="0"></th>
                      <td>`+ moneda + " " + `<span id="subtotal-` + i + `">` + (cosas.unitCost * 40) * cosas.count + `</span></th>
                    </tr>
                   </tbody> `
                } else {
                    htmlContentToAppend += `<tbody>
                 <tr>
                   <td><img style="display:block; height: 110px;" src="`+ cosas.src + `" alt="imagen de producto"></th>
                   <td>`+ cosas.name + `</th>
                   <td id="costo-`+ i + `">` + moneda + " " + cosas.unitCost + `</th>
                   <td><input style="width: 5em;" type="number" class="form-control" id="cantidad-`+ i + `" placeholder="" required="" value="` + cosas.count + `" min="0"></th>
                   <td>`+ moneda + " " + `<span id="subtotal-` + i + `">` + cosas.unitCost * cosas.count + `</span></th>
                 </tr>
                </tbody>    
                 `
                }



            }
            document.getElementById("tabla").innerHTML = htmlContentToAppend;

            let cantidad0 = document.getElementById("cantidad-0").value;
            let cantidad1 = document.getElementById("cantidad-1").value;
            let subtotal0 = document.getElementById("subtotal-0").value;
            let subtotal1 = document.getElementById("subtotal-1").value;
            let tipodeenvio = document.getElementsByName('descuento').value;

            //document.getElementById("subtotal").innerHTML = (subtotal0 + subtotal1);
            // document.getElementById("costosubtotal").innerHTML = moneda + (subtotal0 + subtotal1);

            document.getElementById("subtotal").innerHTML = (cantidad0 * array[0].unitCost + (cantidad1 * array[1].unitCost * 40));
            //document.getElementById("costosubtotal").innerHTML =  (cantidad0 * array[0].unitCost + (cantidad1 * array[1].unitCost * 40));
            document.getElementById("moneda").innerHTML = moneda;

            document.getElementById("cantidad-0").addEventListener("click", function () {
                cantidad0 = document.getElementById("cantidad-0").value;
                document.getElementById("subtotal-0").innerHTML = cantidad0 * array[0].unitCost
                document.getElementById("subtotal").innerHTML = (cantidad0 * array[0].unitCost + (cantidad1 * array[1].unitCost * 40));
                //document.getElementsByName("moneda").innerHTML = moneda;                
                //document.getElementById("costosubtotal").innerHTML = moneda + (cantidad0 * array[0].unitCost + (cantidad1 * array[1].unitCost * 40));
                displayRadioValue()
            })

            document.getElementById("cantidad-1").addEventListener("click", function () {
                cantidad1 = document.getElementById("cantidad-1").value;
                document.getElementById("subtotal-1").innerHTML = cantidad1 * (array[1].unitCost * 40);
                document.getElementById("subtotal").innerHTML = (cantidad0 * array[0].unitCost + (cantidad1 * array[1].unitCost * 40));
                //document.getElementsByName("moneda").innerHTML = moneda;                
                //document.getElementById("costosubtotal").innerHTML = moneda + (cantidad0 * array[0].unitCost + (cantidad1 * array[1].unitCost * 40));
                displayRadioValue()
            })



            function displayRadioValue() {

                var ele = document.getElementsByName('costoenvio');
                let subtotal = parseInt(document.getElementById("subtotal").innerHTML);

                for (i = 0; i < ele.length; i++) {
                    if (ele[i].checked)
                        document.getElementById("costoenvio").innerHTML
                            = "UYU " + `<span id="porcentaje">` + Math.round((ele[i].value / 100) * subtotal) + ` </span>`;
                }
                let porcentaje = parseInt(document.getElementById("porcentaje").innerHTML);
                document.getElementById("costototal").innerHTML = moneda + " " + (porcentaje + subtotal);
            }

            document.getElementById("envios").addEventListener("click", function () {
                displayRadioValue()

            })
            displayRadioValue()



        }
        //Se obtiene el formulario de compra de producto
        var buyForm = document.getElementById("buy-info");

        //Se agrega una escucha en el evento 'submit' que será
        //lanzado por el formulario cuando se seleccione 'Comprar'.
        buyForm.addEventListener("submit", function (e) {

            let direccionCalle = document.getElementById("calle");
            let direccionNumero = document.getElementById("numerodecalle");
            let direccionEsquina = document.getElementById("esquina");
            let modoPago = document.getElementById("mododepago");

            let infoMissing = false;

            //Quito las clases que marcan como inválidos
            direccionCalle.classList.remove('is-invalid');
            direccionNumero.classList.remove('is-invalid');
            direccionEsquina.classList.remove('is-invalid');
            modoPago.classList.remove('is-invalid');

            //Se realizan los controles necesarios,
            //En este caso se controla que se haya ingresado el nombre y categoría.
            //Consulto por el nombre de la calle
            if (direccionCalle.value === "") {
                direccionCalle.classList.add('is-invalid');
                infoMissing = true;
                document.getElementById("ocultarCalle").hidden = false;
            }

            //Consulto por el numero de direccion
            if (direccionNumero.value === "") {
                direccionNumero.classList.add('is-invalid');
                infoMissing = true;
                document.getElementById("ocultarNumero").hidden = false;
            }

            //Consulto por la esquina
            if (direccionEsquina.value <= 0) {
                direccionEsquina.classList.add('is-invalid');
                infoMissing = true;
                document.getElementById("ocultarEsquina").hidden = false;
            }

            //Consulto el metodo de pago
            if (metodoDePago == false) {
                modoPago.classList.add('is-invalid');
                infoMissing = true;
                document.getElementById("ocultarPago").hidden = false;
            }



            if (!infoMissing) {
                //Aquí ingresa si pasó los controles, irá a enviar
                //la solicitud para crear la publicación.

                getJSONData(CART_BUY_URL).then(function (resultObj) {
                    let msgToShowHTML = document.getElementById("resultSpan");
                    let msgToShow = "";

                    //Si la publicación fue exitosa, devolverá mensaje de éxito,
                    //de lo contrario, devolverá mensaje de error.
                    if (resultObj.status === 'ok') {
                        msgToShow = resultObj.data.msg;
                        document.getElementById("alertResult").classList.add('alert-success');

                        document.getElementById("ocultarCalle").hidden = true;
                        document.getElementById("ocultarNumero").hidden = true;
                        document.getElementById("ocultarEsquina").hidden = true;
                        document.getElementById("ocultarPago").hidden = true;
                        document.getElementById("calle").value = "";
                        document.getElementById("numerodecalle").value = "";
                        document.getElementById("esquina").value = "";
                    }
                    else if (resultObj.status === 'error') {
                        msgToShow = ERROR_MSG;
                        document.getElementById("alertResult").classList.add('alert-danger');
                    }

                    msgToShowHTML.innerHTML = msgToShow;
                    document.getElementById("alertResult").classList.add("show");
                });


            }

            //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
            if (e.preventDefault) e.preventDefault();
            return false;
        });


    });

});


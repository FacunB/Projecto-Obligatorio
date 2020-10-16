let moneda = "UYU";
let porcentajeEnvio = 0.15;

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


            /* document.getElementById("goldradio").addEventListener("change", function(){
                 porcentajeEnvio = 0.15;
                 document.getElementById("costoenvio").innerHTML = "UYU " + (ele[i].value / 100) * subtotal ;
                 document.getElementById("costototal").innerHTML = moneda + " " + (subtotal + porcentajeenvio);
             });
             
             document.getElementById("premiumradio").addEventListener("change", function(){
                 porcentajeEnvio = 0.07;
                 document.getElementById("costototal").innerHTML = moneda + " " + (subtotal + porcentajeenvio);
             });
         
             document.getElementById("standardradio").addEventListener("change", function(){
                 porcentajeEnvio = 0.05;
                 document.getElementById("costototal").innerHTML = moneda + " " + (subtotal + porcentajeenvio);
             });*/


        }

    });

});


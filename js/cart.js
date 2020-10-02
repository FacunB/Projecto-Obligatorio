
function mostrarCarro(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.articles[i].length; i++){
        let array = items[i];
                
        htmlContentToAppend += `<tr>
        <th>`+ array.articles[i].src +`</th>
        <th>`+ array.articles[i].name +`</th>
        <th id="costo">`+ array.articles[i].currency + " " + array.articles[i].unitCost +`</th>
        <th><input type="number" class="form-control" id="cantidad" placeholder="" required="" value="1" min="0"></th>
        <th>Subtotal</th>
      </tr>
        `
                    
    }
    document.getElementById("tabla").innerHTML = htmlContentToAppend;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_DESAFIO_URL).then(function(resultObjeto){
        if(resultObjeto.status === "ok"){
            items = resultObjeto.data;
            mostrarCarro();
        }
    });

});
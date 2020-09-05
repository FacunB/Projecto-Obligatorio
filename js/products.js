const ORDER_ASC_BY_COST = "123";
const ORDER_DESC_BY_COST = "321";
const ORDER_BY_PROD_SOLD = "Relev.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}



function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let category = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

        htmlContentToAppend += `<a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="list-group-item list-group-item-action" id="redir">
            <div id="busq" class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name + `</h4>
                        <small class="text-muted">` + category.currency + category.cost + ` <br></small>
                        <small class="text-muted">` + category.soldCount +  ` vendidos <br></small>
                    </div>
                    <p>${ category.description} </p>

                </div>
                
            </div>
            
        </div></a>
        `
            }

        document.getElementById("productos").innerHTML = htmlContentToAppend;
    }
}


function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//document.addEventListener("DOMContentLoaded", function(e){
 //   getJSONData(PRODUCTS_URL).then(function(resultObj){
  //      if (resultObj.status === "ok")
 //       {
  //          currentProductsArray = resultObj.data;
 //           //Muestro las categorías ordenadas
 //           showProductsList(currentProductsArray);
 //       }
 //   });
//});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});

///NO SE COMO HACER AAA
/*let buscar = document.getDocumentById('#buscador');

buscar.addEventListener("keyup", (event) => {
    
});*/

///No me funcionó
/*const buscador = document.querySelector("buscador");
const boton = document.querySelector("boton");
const resultado = document.querySelector("productos")

const filtrar = () =>{

    const texto = buscador.value.toLowerCase();
    for(let product of currentProductsArray){
        let nombre = product.name.toLowerCase();
        if (nombre.indexOf(texto) !== -1){
            resultado.innerHTML +=`
        <div class="list-group-item list-group-item-action">
            <div id="busq" class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name + `</h4>
                        <small class="text-muted">` + category.currency + category.cost + ` <br></small>
                        <small class="text-muted">` + category.soldCount +  ` vendidos <br></small>
                    </div>
                    <p>${ category.description} </p>

                </div>
                
            </div>
            
        </div>
        `
        }

    }
}

boton.addEventListener('click', filtrar)*/

///Otra prueba
function mostrar(){
    var texto = document.getElementById("buscador").value.toUpperCase();

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];

        var nombre = products.name.toUpperCase();
        var desc = products.description.toUpperCase();
        
        if (nombre.includes(texto) || desc.includes(texto) ){

        htmlContentToAppend += `<a href="product-info.html">
        <div class="list-group-item list-group-item-action" id="redir">
            <div id="busq" class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name + `</h4>
                        <small class="text-muted">` + products.currency + products.cost + ` <br></small>
                        <small class="text-muted">` + products.soldCount +  ` vendidos <br></small>
                    </div>
                    <p>${ products.description} </p>

                </div>
                
            </div>
            
        </div></a>
        `
            }

        document.getElementById("productos").innerHTML = htmlContentToAppend;
    }

}


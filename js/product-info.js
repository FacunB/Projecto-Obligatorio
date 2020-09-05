var product = {};
var commentsArray =[];
var relacionadosArray=[];


function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComments(){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < commentsArray.length; i++){
        let comment = commentsArray[i];

        var score = "";
        for (let i = 1; i <= comment.score; i++){
            score += `<span class="fa fa-star checked"></span>`
        }
        for (let i = comment.score; i <5; i++){
            score += `<span class="fa fa-star"></span>`
        }

        
        htmlContentToAppend += `<hr>
        <div class="container mt-5">
        <div class="d-flex justify-content-left row">
            <div class="col-md-6">
                <div class="p-3 bg-white rounded">                    
                    <div class="review mt-4">
                        <div class="d-flex flex-row comment-user">
                            <div class="ml-2">
                                <div class="d-flex flex-row align-items-center"><span class="name font-weight-bold">`+ comment.user + "  " + `</span><span class="dot ml-2"></span><span class="date">` + "  " + comment.dateTime + `</span></div>
                                <div class="rating">`+ score +`</div>
                            </div>
                        </div>
                        <div class="mt-2">
                            <p class="comment-text">${ comment.description}</p>
                        </div>
                    </div>                            
                </div>
            </div>
        </div>
    </div><hr>
        `
            }

        document.getElementById("contenidocomentario").innerHTML = htmlContentToAppend;
    }
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let soldCountHTML = document.getElementById("soldCount");
            let costHTML = document.getElementById("cost");
            let categoryHTML = document.getElementById("category");
            
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            soldCountHTML.innerHTML = product.soldCount;
            costHTML.innerHTML = product.currency + product.cost;
            categoryHTML.innerHTML = product.category;
            

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObjeto){
        if (resultObjeto.status === "ok")
        {
            commentsArray = resultObjeto.data;
             showComments();
            }
        });
    
        
    });


   
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultRelacionados){
        if(resultRelacionados.status === "ok"){
            relacionadosArray = resultRelacionados.data;

            let relacionado1HTML = document.getElementById("relacionado1");
            
            relacionado1HTML.innerHTML = `<div class="row">
            <div class="col-sm-6">
                <div class="card" style="width: 12rem;">
                    <img class="card-img-top" src="`+ relacionadosArray[1].imgSrc +`" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">`+ relacionadosArray[1].name +`</h5>
                      <p class="card-text">`+ relacionadosArray[1].description +`</p>
                      <a href="#" class="btn btn-primary">Ver</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card" style="width: 12rem;">
                    <img class="card-img-top" src="`+ relacionadosArray[3].imgSrc +`" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">`+ relacionadosArray[3].name +`</h5>
                      <p class="card-text">`+ relacionadosArray[3].description +`</p>
                      <a href="#" class="btn btn-primary">Ver</a>
                    </div>
                </div>
            </div>
          </div>`;
            
        }
    });

});

let qs = function(elemento){
    return document.querySelector(elemento)
}

window.addEventListener('load',function(){
    
    console.log('JS vinculado correctamente...')

    let formulario = qs('form#editarProd');

   /* let elements = formulario.elements; // acá borra el formulario
    for (let index = 0; index < elements.length; index ++){
        elements[index].value = ""
    }*/


    // --> elementos
    let inputSku = qs('#sku');
    let inputNombreEdit = qs('#nombreShow');
    let inputPrice = qs('#precio');
    let selectCategory= qs('#categoria'); //usé un select, no puede quedar vacía
    let inputSCategory = qs('#subCategoria');
    let selectSeccion = qs('#seccion'); // usé un select, esta puede quedar vacía
    let inputDiscount = qs('#discount'); //puede quedar vacío
    let textareaDescrip= qs('#exampleFormControlTextarea1'); 
    let inputFoto = qs('#foto');
    //let vistaPrevia = qs('#vistaPrevia');

//expresiones regulares

let errores = { } //objeto literal de errores vacio para que se vaya llenando
let regExSKU = /^[0-9]{6}$/; 
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; 
let regExPrice = /^[0-9]+(,[0-9]+)?$/;
let regExTXT1 = /^(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{20,450}$/; 
let regExTXT = /^(?=.*[a-z])(?=.*[A-Z]).{20,450}$/;
let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
let regExtTXT2="[a-zA-Z ]{20,450}"
//Te permitirá ingresar letras de la hasta la z, un con un mínimo de 20 caracteres y máximo 450//


//las validaciones del front las refleja sobre cada uno de los inputs
// --> validaciones
    
inputNombreEdit.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.nombreShow = "El nombre del campo es obligatorio";
            errorNombreShow.innerHTML = errores.nombreShow  
            this.classList.add('is-invalid')
            break;
    case this.value.length <= 5: 
        errores.nombreShow = "El campo nombre debe tener al menos 6 letras";
        errorNombreShow.innerHTML = errores.nombreShow
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid'); 
            this.classList.add('is-valid');
            errorNombreShow.innerHTML = ""  
            break;
    }
})











    })
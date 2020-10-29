let qs = function(elemento){
    return document.querySelector(elemento)
}

window.addEventListener('load',function(){
    
    console.log('JS vinculado correctamente...')

    let formularioE = qs('form#editarProd');

   /* let elements = formulario.elements; // acá borra el formulario
    for (let index = 0; index < elements.length; index ++){
        elements[index].value = ""
    }*/


    // --> elementos
    let inputSkuEdit = qs('#skuShow');
    let inputNombreEdit = qs('#nombreShow');
    let inputPriceEdit = qs('#precioShow');
    let inputCategoryE= qs('#categoriaShow'); //usé un select, no puede quedar vacía
    let inputSCategoryE = qs('#subCategoriaShow');
    let inputSeccionE = qs('#seccionShow'); // usé un select, esta puede quedar vacía
    let inputDiscountEdit = qs('#discountShow'); //puede quedar vacío
    let textareaDescrip= qs('#exampleFormControlTextarea1'); 
    let inputFotoEdit = qs('#fotoEdit');
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

inputSkuEdit.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.skuShow = "El campo del SKU es obligatorio";
            errorSkuShow.innerHTML = errores.skuShow
            this.classList.add('is-invalid')
            break;
    case !regExSKU.test(this.value):  
        errores.skuShow = "Debes escribir un SKU válido de 6 dígitos, superior a 380.000";
        errorSkuShow.innerHTML = errores.skuShow
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorSkuShow.innerHTML = ""  // lo vacio
            break;
    }
})

inputPriceEdit.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.precioShow = "El campo del Precio es obligatorio";
            errorPrecioShow.innerHTML = errores.precioShow
            this.classList.add('is-invalid')
            break;
    case !regExPrice.test(this.value):  
        errores.precioShow = "Debes escribir un Precio válido";
        errorPrecioShow.innerHTML = errores.precioShow
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorPrecioShow.innerHTML = ""  // lo vacio
            break;
    }
})

inputDiscountEdit.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.discountShow = "El campo del descuento es obligatorio,  de no aplicar descuento deberá validar la opción cero";
            errorDiscountShow.innerHTML = errores.discountShow
            this.classList.add('is-invalid')
            break;
    case !regExPrice.test(this.value):  
        errores.discountShow = "Debes escribir un valor aplicable al descuento";
        errorDiscountShow.innerHTML = errores.discountShow
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorDiscountShow.innerHTML = ""  // lo vacio
            break;
    }
})

inputFotoEdit.addEventListener('change',function(e){
    switch (true) {
        case !regExExtensions.exec(this.value) :
            errores.fotoShow = "Solo imagenes con extension jpg, jpeg, png, o gif"
            errorFotoShow.innerHTML = errores.fotoShow;
            this.classList.add('is-invalid')
            this.value = '';
            vistaPrevia.src = "";
        break
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFotoShow.innerHTML = "";
            // Creamos el objeto de la clase FileReader
            let reader = new FileReader();
            // Leemos el archivo subido y se lo pasamos a nuestro fileReader
            reader.readAsDataURL(e.target.files[0]);
            // Le decimos que cuando este listo ejecute el código interno
            reader.onload = function(){
            vistaPrevia.src = reader.result;
            };
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFotoShow.innerHTML = "";
        }
    })

    inputSCategoryE.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errores.subCategoriaShow = "El campo es obligatorio";
                errorSubcategoriaShow.innerHTML = errores.subCategoriaShow
                this.classList.add('is-invalid')
                break;
                case this.value.length <= 5: //debe tener al menos 6 letras 
            errores.subCategoriaShow = "Debes escribir una Subcategoria válida";
            errorSubcategoriaShow.innerHTML = errores.subCategoriaShow
            this.classList.add('is-invalid')
            break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorSubcategoriaShow.innerHTML = ""  // lo vacio
                break;
        }
    })

    inputCategoryE.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errores.categoriaShow = "El campo Categpria es obligatorio";
                errorCategoriaShow.innerHTML = errores.categoriaShow
                this.classList.add('is-invalid')
                break;
                case this.value.length <= 5: //debe tener al menos 6 letras 
            errores.categoriaShow = "Debes escribir una Categoria válida";
            errorCategoriaShow.innerHTML = errores.categoriaShow
            this.classList.add('is-invalid')
            break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorCategoriaShow.innerHTML = ""  // lo vacio
                break;
        }
    })

    inputSeccionE.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errores.seccionShow = "El campo Categpria es obligatorio";
                errorSeccionShow.innerHTML = errores.seccionShow
                this.classList.add('is-invalid')
                break;
                case this.value.length <= 5: //debe tener al menos 6 letras 
            errores.seccionShow = "Debes escribir una Categoria válida";
            errorSeccionShow.innerHTML = errores.seccionShow
            this.classList.add('is-invalid')
            break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorSeccionShow.innerHTML = ""  // lo vacio
                break;
        }
    })

    /*formularioE.addEventListener('submit',function(event){
        let error = false
        event.preventDefault()
    
        let elementosFormE = this.elements
        
        for (let index = 0; index < elementosFormE.length-1; index++) {
            if(elementosFormE[index].value == ""){
                elementosFormE[index].classList.add('is-invalid');
                msgError.innerHTML = "Los campos señalados son obligatorios para editar productos";
                error =true
            }
        }
        if(!error){
            console.log("Todo Perfecto en la edición!!");
            alert("Producto modificado correctamente")
            formularioE.submit()
        }
        
    })*/
    


    })
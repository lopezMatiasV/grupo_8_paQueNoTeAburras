let qs = function(elemento){
    return document.querySelector(elemento)
}

window.addEventListener('load',function(){
    
    console.log('JS vinculado correctamente...')

    let formulario = qs('form#cargaProd');

    /*let elements = formulario.elements; // acá borra el formulario
    for (let index = 0; index < elements.length; index ++){
        elements[index].value = ""
    }*/

// --> elementos
    let inputSku = qs('#sku');
    let inputNombre = qs('#nombre');
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
let regExTXT1 = /^(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{6,45}$/; 
let regExTXT = /^(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
let regExtTXT2="[a-zA-Z ]{2,254}"
//Te permitirá ingresar letras de la hasta la z, un con un mínimo de 2 caracteres y máximo 254//


//las validaciones del front las refleja sobre cada uno de los inputs
// --> validaciones

inputSku.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.sku = "El campo del SKU es obligatorio";
            errorSku.innerHTML = errores.sku
            this.classList.add('is-invalid')
            break;
    case !regExSKU.test(this.value):  
        errores.sku = "Debes escribir un SKU válido de 6 dígitos, superior a 380.000";
        errorSku.innerHTML = errores.sku
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorSku.innerHTML = ""  // lo vacio
            break;
    }
})

inputNombre.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.nombre = "El nombre del campo es obligatorio";
            errorNombre.innerHTML = errores.nombre  //para las etiquetas span del index.ejs (error nombre le voy a agregar el string errores.nombre)
            this.classList.add('is-invalid') //estoy agregando la clase is-invalid, si es que hay un error.
            break;
    case this.value.length <= 5: //debe tener al menos 6 letras
        errores.nombre = "El campo nombre debe tener al menos 6 letras";
        errorNombre.innerHTML = errores.nombre
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid'); //sobre el mismo elemento si hubiera habido un error lo voy a remover y le voy a agregar
            this.classList.add('is-valid');
            errorNombre.innerHTML = ""  // lo vacio
            break;
    }
})

inputPrice.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.precio = "El campo del Precio es obligatorio";
            errorPrecio.innerHTML = errores.precio
            this.classList.add('is-invalid')
            break;
    case !regExPrice.test(this.value):  
        errores.precio = "Debes escribir un Precio válido";
        errorPrecio.innerHTML = errores.precio
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorPrecio.innerHTML = ""  // lo vacio
            break;
    }
})

selectCategory.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.categoria = "La Categoria es obligatoria";
            errorCategoria.innerHTML = errores.categoria  //para las etiquetas span del index.ejs (error nombre le voy a agregar el string errores.nombre)
            this.classList.add('is-invalid') //estoy agregando la clase is-invalid, si es que hay un error.
            break;
    case this.value.length <= 5: //debe tener al menos 6 letras
        errores.categoria = "El campo Categoria debe tener al menos 6 letras";
        errorCategoria.innerHTML = errores.categoria
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid'); //sobre el mismo elemento si hubiera habido un error lo voy a remover y le voy a agregar
            this.classList.add('is-valid');
            errorCategoria.innerHTML = ""  // lo vacio
            break;
    }
})

inputSCategory.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.subCategoria = "El campo es obligatorio";
            errorSubcategoria.innerHTML = errores.subCategoria
            this.classList.add('is-invalid')
            break;
            case this.value.length <= 5: //debe tener al menos 6 letras 
        errores.seccion = "Debes escribir una Subcategoria válida";
        errorSubcategoria.innerHTML = errores.subCategoria
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorSubcategoria.innerHTML = ""  // lo vacio
            break;
    }
})

selectSeccion.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.seccion = "La Sección es obligatoria";
            errorSeccion.innerHTML = errores.seccion  //para las etiquetas span del index.ejs (error nombre le voy a agregar el string errores.nombre)
            this.classList.add('is-invalid') //estoy agregando la clase is-invalid, si es que hay un error.
            break;
    case this.value.length <= 5: //debe tener al menos 6 letras
        errores.seccion = "El campo sección debe estar seleccionado incluso en opcion vacío";
        errorSeccion.innerHTML = errores.seccion
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid'); //sobre el mismo elemento si hubiera habido un error lo voy a remover y le voy a agregar
            this.classList.add('is-valid');
            errorSeccion.innerHTML = ""  // lo vacio
            break;
    }
})

inputDiscount.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.discount = "El campo del descuento es obligatorio,  de no aplicar descuento deberá validar la opción cero";
            errorDiscount.innerHTML = errores.discount
            this.classList.add('is-invalid')
            break;
    case !regExPrice.test(this.value):  
        errores.discount = "Debes escribir un valor aplicable al descuento";
        errorPrecio.innerHTML = errores.discount
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorDiscount.innerHTML = ""  // lo vacio
            break;
    }
})

/*textareaDescrip.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.exampleFormControlTextarea1 = "El campo de la descripción es obligatorio";
            errorDescripcion.innerHTML = errores.exampleFormControlTextarea1
            this.classList.add('is-invalid')
            break;
    case !regExTXT.test(this.value):  
        errores.exampleFormControlTextarea1 = "Debes escribir una Descripción de al menos 20 caracteres";
        errorDescripcion.innerHTML = errores.exampleFormControlTextarea1
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorDescripcion.innerHTML = ""  // lo vacio
            break;
    }
})*/




inputFoto.addEventListener('change',function(e){
    switch (true) {
        case !regExExtensions.exec(this.value) :
            errores.foto = "Solo imagenes con extension jpg, jpeg, png, o gif"
            errorFoto.innerHTML = errores.foto;
            this.classList.add('is-invalid')
            this.value = '';
            vistaPrevia.src = "";
        break
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFoto.innerHTML = "";
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
            errorFoto.innerHTML = "";
        }
    })
})
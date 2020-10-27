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
    let inputCategory= qs('#categoria');
    let inputSCategory = qs('#subCategoria');
    let inputSeccion = qs('#seccion');
    let inputDiscount = qs('#discount');
    let selectDescrip= qs('#exampleFormControlTextarea1');
    let inputFoto = qs('#foto');
    //let vistaPrevia = qs('#vistaPrevia');

//expresiones regulares

let errores = { } //objeto literal de errores vacio para que se vaya llenando
let regExSKU = /^[0-9]{6}$/; // debe comenzar en 3XXXXX
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //ver/
let regExPrice = /^[0-9]+(,[0-9]+)?$/;
let regExTXT = /^(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // cualquier valor alfabetico?ni numeros ni caracteres especiales

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

/*inputCategory.addEventListener('blur', function(){
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
})*/

inputSCategory.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.eccion = "El campo es obligatorio";
            errorSubcategoria.innerHTML = errores.eccion
            this.classList.add('is-invalid')
            break;
            case this.value.length <= 5: //debe tener al menos 6 letras 
        errores.eccion = "Debes escribir una Subcategoria válida";
        errorSubcategoria.innerHTML = errores.eccion
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorSubcategoria.innerHTML = ""  // lo vacio
            break;
    }
})

function fileValidation(){
    var fotoPath = inputFoto.value;
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if(!allowedExtensions.exec(fotoPath)){
        alert('Por favor revise la extensión del archivo .jpeg/.jpg/.png/.gif solo.');
        inputFoto.value = '';
        return false;
    }else{
        //Image preview
        if (inputFoto.files && inputFoto.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'"/>';
            };
            reader.readAsDataURL(inputFoto.files[0]);
        }
    }
}

})
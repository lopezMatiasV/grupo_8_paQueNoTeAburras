let qs = function(elemento){
    return document.querySelector(elemento)
}

window.addEventListener('load',function(){
    
    console.log('JS vinculado correctamente...')

    let formulario = qs('form#cargaProd');

    let elements = formulario.elements; // acá borra el formulario
    for (let index = 0; index < elements.length; index ++){
        elements[index].value = ""
    }

// --> elementos
    let inputSku = qs('#sku');
    let inputNombre = qs('#nombre');
    let inputPrice = qs('#precio');
    let selectCategoria= qs('#selectCategoria'); //usé un select, no puede quedar vacía /  let selectCategory= qs(#categoria);
    let inputSCategory = qs('#subCategoria');
    let selectSub = qs('#selectSub')
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
function ordenarAsc(p_array_json, p_key){
    p_array_json.sort(function(a,b){
        return a[p_key] >  b[p_key];
    });
}

let subcategorias = function(idCategoria){
    selectSub.innerHTML = ""
    fetch(`${window.location.origin}/api/subcategorias/${idCategoria}`)
    .then(response => response.json())
    .then(subcategorias => {
        console.log(subcategorias)
       ordenarAsc(subcategorias,'nombre')
        subcategorias.forEach(subcategoria => {
            selectSub.innerHTML +=
              `<option value="${subcategoria.id}">${subcategoria.nombre}</option>`
        });
    })
}



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

selectCategoria.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.categoria = "La Categoria es obligatoria";
            errorCategoria.innerHTML = errores.categoria  //para las etiquetas span del index.ejs (error nombre le voy a agregar el string errores.nombre)
            this.classList.add('is-invalid') //estoy agregando la clase is-invalid, si es que hay un error.
            break;
            default:
            this.classList.remove('is-invalid'); //sobre el mismo elemento si hubiera habido un error lo voy a remover y le voy a agregar
            this.classList.add('is-valid');
            errorCategoria.innerHTML = ""  // lo vacio
            break;
    }
})

selectSub.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.subCategoria = "El campo es obligatorio";
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
        errores.seccion = "El campo sección debe estar validado";
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
            errores.discount = "El campo del descuento es obligatorio";
            errorDiscount.innerHTML = errores.discount
            this.classList.add('is-invalid')
            break;
    case !regExPrice.test(this.value):  
        errores.discount = "Debes escribir un valor aplicable al descuento";
        errorDiscount.innerHTML = errores.discount
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorDiscount.innerHTML = ""  // lo vacio
            break;
    }
})

    textareaDescrip.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errores.exampleFormControlTextarea1 = "La Descripción del Producto es obligatoria";
                errorDescripcion.innerHTML = errores.exampleFormControlTextarea1 
                this.classList.add('is-invalid') 
                break;
        case this.value.length <= 19:
            errores.exampleFormControlTextarea1 = "El campo descripción debe tener al menos 20 letras";
            errorDescripcion.innerHTML = errores.exampleFormControlTextarea1
            this.classList.add('is-invalid')
            break;
            default:
                this.classList.remove('is-invalid'); 
                this.classList.add('is-valid');
                errorDescripcion.innerHTML = ""  
                break;
        }
    })
    

   
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

    selectCategoria.addEventListener('change',()=>{
        subcategorias(selectCategoria.value)
        })
 

formulario.addEventListener('submit',function(event){
    let error = false
    event.preventDefault()

    let elementosForm = this.elements
    
    for (let index = 0; index < elementosForm.length-1; index++) {
        if(elementosForm[index].value == ""){
            elementosForm[index].classList.add('is-invalid');
            msgError.innerHTML = "Los campos señalados son obligatorios";
            error =true
        }
    }
    if(!error){
        console.log("Todo Perfecto!!");
        alert("Producto cargado correctamente")
        formulario.submit()
    }
    
})


})
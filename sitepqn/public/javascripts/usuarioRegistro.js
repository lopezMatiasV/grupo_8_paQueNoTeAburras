const qs = function (element){
    return document.querySelector(element);
}


window.addEventListener('load',function(){
    
    //alert('vinculado')
    let formRegistro = qs('form#registro');

    let elements = formRegistro.elements
    for (let index = 0; index < elements.length; index ++){
    elements[index].value = ""
}
    let inputNombre = qs('#usuario');
    let inputApellido = qs('#apellido');
    let inputEmail = qs('#email');
    let inputAvatar = qs('#avatar');
    let inputPass = qs('#pass');
    let inputPass2 = qs('#pass2');
    let checkBases = qs('#customCheck');
    let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    let errores = { }
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;


inputNombre.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.nombre = "El campo nombre es obligatorio";
            errorNombre.innerHTML = errores.nombre  //para las etiquetas span del index.ejs (error nombre le voy a agregar el string errores.nombre)
            this.classList.add('is-invalid') //estoy agregando la clase is-invalid, si es que hay un error.
            break;
    case this.value.length <= 2: //debe tener al menos 3 letras
        errores.nombre = "El campo nombre debe tener al menos 3 letras";
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
inputApellido.addEventListener('blur', function(){ //reeemplazar 
    switch (true) {
        case this.value.length == 0:
            errores.apellido = "El campo apellido es obligatorio";
            errorApellido.innerHTML = errores.apellido
            this.classList.add('is-invalid')
            break;
    case this.value.length <=2:
        errores.apellido = "El campo apellido debe tener al menos 3 letras";
        errorApellido.innerHTML = errores.apellido
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorApellido.innerHTML = ""  // lo vacio
            break;
    }
})

inputEmail.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errores.email = "El campo email es obligatorio";
            errorsEmail.innerHTML = errores.email
            this.classList.add('is-invalid')
            break;
    case !regExEmail.test(this.value):
        errores.email = "Debes escribir un mail válido";
        errorsEmail.innerHTML = errores.email
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorsEmail.innerHTML = ""  // lo vacio
            break;
    }
})
inputPass.addEventListener('blur', function(){
  switch (true) {
        case this.value.length == "":
            errores.pass = "El campo contraseña es obligatorio";
            errorsPass.innerHTML = errores.pass
            this.classList.add('is-invalid')
            break;
    case !regExPass.test(this.value):
        errores.pass = "El campo contraseña debe tener: entre 8 y 12 caracteres, al menos 1 mayúscula, una minúscula y un número";
        errorsPass.innerHTML = errores.pass
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorsPass.innerHTML = ""  // lo vacio
            break;
    }
})

inputPass2.addEventListener('blur',function(){ //compara una contraseña con otra
    switch (true) {
        case this.value == "":
            errores.pass2 = "La verificación de contraseña es obligatorio"
            errorsPass2.innerHTML = errores.pass2;
            this.classList.add('is-invalid')
        break
        case this.value != inputPass.value:
            errores.pass2 = "Las contraseñas no coinciden"
            errorsPass2.innerHTML = errores.pass2;
            this.classList.add('is-invalid')
        break;
        default:
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        errorsPass2.innerHTML = "";
    }
})

inputAvatar.addEventListener('blur',function(e){
    switch (true) {
       case !regExExtensions.exec(this.value) :
       errores.formato = "Solo imagenes con extension jpg, jpeg, png, o gif"
       errorFormato.innerHTML = errores.formato;
       this.classList.add('is-invalid')
       this.value = '';
       vistaPrevia.src = "";
       break;
       default:
       this.classList.remove('is-invalid');
       this.classList.add('is-valid');
       errorFormato.innerHTML = "";
       let reader = new FileReader();
       reader.ReadAsDataURL(e.target.files[0]);
       reader.onload = function(){
        vistaPrevia.src = reader.result;
       };
       this.classList.remove('is-invalid');
       this.classList.add('is-valid');
       errorFormato.innerHTML = "";
    }
})
    checkBases.addEventListener('click',function(){
            checkBases.classList.toggle('is-valid');
            checkBases.classList.remove('is-invalid');
            errorsBases.innerHTML = " "
    })

formRegistro.addEventListener('submit',function(event){
    let error = false
    event.preventDefault()

    let elementosForm = this.elements
    
    for (let index = 0; index < elementosForm.length-1; index++) {
        if(elementosForm[index].value == ""){
            elementosForm[index].classList.add('is-invalid');
            msgError.innerHTML = "Los campos señadados son obligatorios";
            error =true
        }
    }
    if(!error){
        //alert("perfecto")
        formRegistro.submit()
    }
    
})

})

const qs = function (element){
    return document.querySelector(element);
}


window.addEventListener('load',function(){
    
    //alert('vinculado')
    let formRegistro = qs('#registro')
    let elements = formRegistro.elements

    let inputNombre = qs('#usuario');
    let inputApellido = qs('#apellido');
    let inputEmail = qs('#email');
    let inputAvatar = qs('#avatar');
    let inputPass = qs('#pass');
    let inputPass2 = qs('#pass2');
    let checkBases = qs('#customCheck1');
    let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    //let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;


inputNombre.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errorNombre.innerHTML = "El campo nombre es obligatorio";  //para las etiquetas span del index.ejs (error nombre le voy a agregar el string errores.nombre)
            this.classList.add('is-invalid') //estoy agregando la clase is-invalid, si es que hay un error.
            break;
    case this.value.length <= 2: //debe tener al menos 3 letras
        errorNombre.innerHTML = "El campo nombre debe tener al menos 3 letras";
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
            errorApellido.innerHTML = "El campo apellido es obligatorio";
            this.classList.add('is-invalid')
            break;
    case this.value.length <=2:
        errorApellido.innerHTML = "El campo apellido debe tener al menos 3 letras";
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
            errorsEmail.innerHTML = "El campo email es obligatorio";
            this.classList.add('is-invalid')
            break;
    case !regExEmail.test(this.value):
        errorsEmail.innerHTML = "Debes escribir un mail válido";
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
            errorsPass.innerHTML = "El campo contraseña es obligatorio";
            this.classList.add('is-invalid')
            break;
    case !regExPass.test(this.value):
        errorsPass.innerHTML = "El campo contraseña debe tener: entre 8 y 12 caracteres, al menos 1 mayúscula, una minúscula y un número";
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
            errorsPass2.innerHTML = "La verificación de contraseña es obligatorio"
            this.classList.add('is-invalid')
        break
        case this.value != inputPass.value:
            errorsPass2.innerHTML = "Las contraseñas no coinciden"
            this.classList.add('is-invalid')
        break;
        default:
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        errorsPass2.innerHTML = "";
    }
})

inputAvatar.addEventListener('blur',function(e){
    let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
        switch (true) {
            case !regExExtensions.exec(this.value):
                errorFormato.innerHTML = "Solo imagenes con extension jpg, jpeg, png, o gif";
                this.classList.add('is-invalid')
                this.value = '';
                break
            default:
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
    event.preventDefault()
     if(checkBases.checked == false){
        checkBases.classList.add('is-invalid');
        errorsBases.innerHTML = "Debes aceptar las bases y condiciones"
        }
    let elementsForm = this.elements
    let errores = false
    for (let index = 0; index < elementsForm.length-1; index++) {
        if(elementsForm[index].value == ""){
            elementsForm[index].classList.add('is-invalid');
            errores =true
        }
    }
    if(!errores){
        //alert("perfecto")
        formRegistro.submit()
    }
    console.log(errores)
})
})

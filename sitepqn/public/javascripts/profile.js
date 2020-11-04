const query = function(argumento){
   return document.querySelector(argumento)
}

window.addEventListener('load', function(){
    //alert('vinculado')
    let formProfile = query('#profile');
    let elementos = formProfile.elements;

    let pNombre = query('#pnombre');
    let pApellido = query('#papellido');
    let pEmail = query('#pemail');
    let pAvatar = query('#pavatar');
    let provincia = query('#provincia');
    let ciudad = query('#ciudad');
    let direccion = query('#direccion');
    let telefono = query('#telefono');
    let dni = query('#DNI')
    let errors = { }

   
    let exregulartelefono = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

    let exregulardni = /^\d{8}(?:[-\s]\d{4})?$/;
    
    let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    
    //let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

    pNombre.addEventListener('blur',function(){
        switch (true) {
            case this.value == 0:
                errorsNombre.innerHTML = "El campo nombre es obligatorio"
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length <=2:
                errorsNombre.innerHTML = "Tenés que poner al menos tres letras"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorsNombre.innerHTML = ""
                break;
        }
    })

pApellido.addEventListener('blur', function(){
	switch(true) {
		 case this.value.length == 0:
            errors.apellido = "El campo apellido es obligatorio";
            errorsApellido.innerHTML = errors.apellido  
            this.classList.add('is-invalid')
            break;
      case this.value.length <= 2: 
        errors.apellido = "El apellido debe tener como minimo 3 letras";
        errorsApellido.innerHTML = errors.apellido
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid'); 
            this.classList.add('is-valid');
            errorsApellido.innerHTML = ""  
            break;
	}
})
pEmail.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errors.email = "El email es obligatorio";
            errorsEmail.innerHTML = errors.email
            this.classList.add('is-invalid')
            break;
    case !regExEmail.test(this.value):
        errors.email = "Debes escribir un mail válido";
        errorsEmail.innerHTML = errors.email
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorsEmail.innerHTML = ""  // lo vacio
            break;
    }
})
   pAvatar.addEventListener('change', function (e) {
        let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
        switch (true) {
            case !regExExtensions.exec(this.value):
                errorsFormato.innerHTML = "Solo imagenes con extension jpg, jpeg, png, o gif";
                this.classList.add('is-invalid')
                this.value = '';
                vistaPrevia.src = "";
                break
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorsFormato.innerHTML = "";

                let reader = new FileReader();
                
                reader.readAsDataURL(e.target.files[0]);
              
                reader.onload = function () {
                   vistaPrevia.src = reader.result;
                };
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorsFormato.innerHTML = "";
        }
    })
dni.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            this.classList.add('is-valid')
            this.classList.remove('is-invalid');
            errorsDNI.innerHTML = "" 
            break;
    case !exregulardni.test(this.value):
        errors.dni = "Debes escribir un DNI válido";
        errorsDNI.innerHTML = errors.dni
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorsDNI.innerHTML = ""  // lo vacio
            break;
    }
})
direccion.addEventListener('blur', function(){
    switch(true) {
		 case this.value.length == 0:
            this.classList.add('is-valid')
            this.classList.remove('is-invalid');
            errorsDireccion.innerHTML = "" 
            break;
      case this.value.length <= 2: 
        errors.direccion = "la direccion debe tener como minimo 3 letras";
        errorsDireccion.innerHTML = errors.direccion
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid'); 
            this.classList.add('is-valid');
            errorsDireccion.innerHTML = ""  
            break;
}
})
telefono.addEventListener('blur', function(){
	switch (true) {
        case this.value.length == 0:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            errorsTelefono.innerHTML = ""
            break;
    case this.value.length <= 9 :
        errors.telefono = "Debes escribir un telefono válido";
        errorsTelefono.innerHTML = errors.telefono
        this.classList.add('is-invalid')
        break;
        default:
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        errorsTelefono.innerHTML = ""  // lo vacio
        break;
    }
})

formProfile.addEventListener('submit',function(){
   
    let error = false
    console.log(error)
    event.preventDefault()
       
    for (let index = 0; index < elementos.length-1; index++) {
        if(elementos[index].value == ""){
            elementos[index].classList.add('is-invalid');
            errors =true
        }
    }
    if(!errors){
        //alert("perfecto")
        formProfile.submit()
    }
    
})
})

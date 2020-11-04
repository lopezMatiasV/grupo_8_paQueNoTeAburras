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

   
    let exregulartelefono = /(?<=\s|:)\(?(?:(0?[1-3]\d{1,2})\)?(?:\s|-)?)?((?:\d[\d-]{5}|15[\s\d-]{7})\d+)/;

    let exregulardni = /^\d{8}(?:[-\s]\d{4})?$/;
    
    let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    
    let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

pNombre.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errors.nombre = "El campo nombre es obligatorio";
            errorsNombre.innerHTML = errors.nombre  
            this.classList.add('is-invalid') 
            break;
      case this.value.length <= 2: 
        errors.nombre = "El nombre debe tener como minimo 3 letras";
        errorsNombre.innerHTML = errors.nombre
        this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid'); 
            this.classList.add('is-valid');
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
  pAvatar.onchange = function (e){
        // Creamos el objeto de la clase FileReader
        let reader = new FileReader();

        // Leemos el archivo subido y se lo pasamos a nuestro fileReader
        reader.readAsDataURL(e.target.files[0]);

        // Le decimos que cuando este listo ejecute el código interno
        reader.onload = function(){
          let imagen = query('.form-control')
          imagen.src = reader.result;
        
       }
     }
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

formProfile.addEventListener('submit',function(){
    let errors = false
    console.log(errors)
    event.preventDefault()
    
    let elements = this.elements
   /*for (let index = 0; index < elements.length-1; index++) {
        if(elements[index].value == 0){
            elements[index].classList.add('is-invalid');
            msgError.innerHTML = "Los campos señalados son obligatorios";
            errors =true
        }
    }*/
    
    if(!errors){
       
        formProfile.submit()
    }else{
    	msgError.innerHTML = "Los campos señalados son obligatorios"
    }
    

})
})

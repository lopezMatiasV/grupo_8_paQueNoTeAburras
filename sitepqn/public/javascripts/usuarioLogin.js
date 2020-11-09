const query = function(argument){
    return document.querySelector(argument)
}

window.addEventListener('load', function(){
   
    let formLogin = query('#logueate')
 
    let emailLog = query('#email2');
    let passLog = query('#passLog');
 //let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
 //let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
 

 emailLog.addEventListener('blur', function(){
    switch (true) {
        case this.value.length == 0:
            errorEmail.innerHTML = "El campo email es obligatorio";
            this.classList.add('is-invalid')
            break;
    /*case !regExEmail.test(this.value):
        errors.email = "Debes escribir un mail válido FRONT";
        errorEmail.innerHTML = errors.email
        this.classList.add('is-invalid')
        break;*/
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorEmail.innerHTML = ""  // lo vacio
            break;
    }
})
passLog.addEventListener('blur', function(){
  switch (true) {
         case this.value.length == "":
            errorPass.innerHTML = "El campo contraseña es obligatorio";
            this.classList.add('is-invalid')
            break;
     /*case !regExPass.test(this.value):
        errors.pass = "El campo contraseña debe tener: entre 6 y 12 caracteres, al menos 1 mayúscula, una minúscula y un número";
        errorPass.innerHTML = errors.pass
        this.classList.add('is-invalid')
        break;*/
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorPass.innerHTML = ""  // lo vacio
            break; 
    }
})
formLogin.addEventListener('submit',function(even){


    even.preventDefault()
    let errores = false
    
    switch(true){
        case emailLog.value.length == 0:
        emailLog.classList.add('is-invalid')
        errores = true;
        break;
        case passLog.value.length == 0:
        passLog.classList.add('is-invalid')
        errores = true;
        break;
        default:
        errores = false
    }
    if(!errores){
        //alert("perfecto")
        formLogin.submit()
    }
    console.log(errores)

})

})


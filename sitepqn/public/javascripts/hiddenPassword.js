window.addEventListener('load', function(){

  console.log('JS ocultar clave vinculado correctamente...')

    const eye = document.querySelector(".feather-eye");
    const eyeoff = document.querySelector(".feather-eye-off");
    const passwordField = document.querySelector("input[type=password]");
    
    eye.addEventListener("click", ()=>{
      eyeoff.style.display = "block";
      eye.style.display = "none";
    
      passwordField.type = "text";
    });
    
    eyeoff.addEventListener("click", () => {
      eyeoff.style.display = "none";
      eye.style.display = "block";
    
      passwordField.type = "password";
    })
    })
    
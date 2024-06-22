// Selecciona los elementos del DOM y los asigna a variables
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
let caracteres8 = document.getElementById('span-registro');//AP
const signUpForm = document.getElementById('signUpForm');

signUpForm.addEventListener('submit', event => {
  event.preventDefault(); // Prevenir el envío del formulario
  let claveDigi = document.getElementById('signUpPassword').value;
  
    // Obtiene los valores de los campos de entrada
    var primernombre = document.getElementById("signUpfirst").value;
    var apellido = document.getElementById("signUplastname").value;
    var email = document.getElementById("signUpEmail").value;
    var fechaNacimiento = document.getElementById("singUpdate").value;
    var password = document.getElementById("signUpPassword").value;
    let isvalidarpwd = validarPassword(claveDigi);
    
    // Verifica que todos los campos estén llenos
    if (primernombre && apellido && email && fechaNacimiento && password) {
      // Verifica si la edad es mayor o igual a 18 años
      if (calculateAge(fechaNacimiento) >= 18) {

        if (isvalidarpwd) {
          // Obtiene los usuarios existentes o inicializa un array vacío
          let users = JSON.parse(localStorage.getItem("users")) || [];
          
          // Crea un nuevo objeto de usuario
          let newUser = {
            nombre: primernombre,
            apellido: apellido,
            email: email,
            fechaNacimiento: fechaNacimiento,
            password: password
          };
          
          // Añade el nuevo usuario al array
          users.push(newUser);
          
          // Guarda el array actualizado en localStorage
          localStorage.setItem("users", JSON.stringify(users));

          //Muestra una alerta de "Registro completado exitosamente"
          alert("Registro completado exitosamente");
          
          // Limpia el formulario
          signUpForm.reset();
        }

      } else {
        // Muestra una alerta de "Debes ser mayor de 18 años para registrarte"
        alert("Debes ser mayor de 18 años para registrarte");
      }
    } else {
      // Muestra una alerta de "Por favor, completa todos los campos"
      if (!primernombre || !apellido || !email || !fechaNacimiento || !password) {
        var errorMessage = document.getElementById("span1");
        errorMessage.style.display = "block";
    }
    }
});

// Agrega un event listener al botón "Sign Up" que agrega la clase "right-panel-active"
// al elemento "container", lo cual cambia la vista a la sección de registro
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

// Agrega un event listener al botón "Sign In" que remueve la clase "right-panel-active"
// del elemento "container", lo cual cambia la vista a la sección de inicio de sesión
signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Función para calcular la edad a partir de la fecha de nacimiento
function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function validarPassword(claveDigi) {
  let caracterSpecRegex = /([!@#$%^&*])/gm;
  let numeroRegex = /([0-9])/gm;
  let mayusculas = /([A-Z])/gm;
  let minusculas = /([a-z])/gm;
  let numDigitos = claveDigi.length;
  if (!(numDigitos >= 8)) 
  { 
    caracteres8.innerHTML = "Clave no cumple con los caracteres solicitados"
    caracteres8.removeAttribute("hidden");
    return false 
  }
  else if (!regexValid(claveDigi, numeroRegex)) {
    return false
  } else if (!regexValid(claveDigi, caracterSpecRegex)) {
    return false;
  } else if (!regexValid(claveDigi, mayusculas)) {
    return false;
  }
  else if (!regexValid(claveDigi, minusculas)) {
    return false;
  }
  else {
    return true
  }
};

const regexValid = (input,regex ) => {
  let resultado = regex.test(input);
  if (!resultado){
    caracteres8.removeAttribute("hidden");
  }
  return resultado;
};

// Agrega un event listener al botón "Sign In" del formulario de inicio de sesión
document.getElementById("signInButton").addEventListener("click", function (event) {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Obtiene la lista de usuarios
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Busca un usuario que coincida con el email y la contraseña
  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    alert("Inicio de sesión exitoso");
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setTimeout(function () {
      window.location.href = "home.html";
    }, 1000);
  } else {
    alert("Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.");
  }
});

// Función para mostrar un modal (ventana emergente)
function showModal(modalId) {
  // Selecciona el elemento modal y el botón de cierre
  var modal = document.getElementById(modalId);
  var span = modal.querySelector(".close");

  // Muestra el modal
  modal.style.display = "block";

  // Agrega un event listener al botón de cierre del modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // Agrega un event listener al documento para cerrar el modal al hacer clic fuera de él
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// Función para cerrar un modal
function closeModal(modalId) {
  // Selecciona el elemento modal y lo oculta
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}
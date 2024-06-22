// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona elementos del formulario
    const updateForm = document.getElementById('updateForm');
    const updateButton = document.getElementById('updateButton');
  
    // Selecciona los campos de entrada del formulario
    const updateEmail = document.getElementById('updateEmail');
    const updateName = document.getElementById('updateName');
    const updateLastName = document.getElementById('updateLastName');
    const updateBirthDate = document.getElementById('updateBirthDate');
    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
  
    // Selecciona los elementos para mostrar mensajes de error
    const updateEmailError = document.getElementById('updateEmailError');
    const updateNameError = document.getElementById('updateNameError');
    const updateLastNameError = document.getElementById('updateLastNameError');
    const updateBirthDateError = document.getElementById('updateBirthDateError');
    const currentPasswordError = document.getElementById('currentPasswordError');
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const validationMessage = document.getElementById('validationMessage');
  
    // Añade un event listener al botón de actualización
    updateButton.addEventListener('click', (e) => {
      e.preventDefault(); // Previene el envío del formulario
      console.log('Botón de actualización clickeado');
      
      let valid = true; // Flag para validación del formulario

      // Reinicia todos los mensajes de error
      [updateEmailError, updateNameError, updateLastNameError, updateBirthDateError, 
       currentPasswordError, newPasswordError, confirmPasswordError, validationMessage].forEach(el => {
        el.classList.remove('show');
      });
  
      // Validación del campo de email
      if (updateEmail.value === '') {
        updateEmailError.classList.add('show');
        valid = false;
      }
  
      // Validación del campo de nombre
      if (updateName.value === '') {
        updateNameError.classList.add('show');
        valid = false;
      }
  
      // Validación del campo de apellido
      if (updateLastName.value === '') {
        updateLastNameError.classList.add('show');
        valid = false;
      }
  
      // Validación del campo de fecha de nacimiento
      if (updateBirthDate.value === '') {
        updateBirthDateError.classList.add('show');
        valid = false;
      } else if (calculateAge(updateBirthDate.value) < 18) {
        updateBirthDateError.textContent = "Debes ser mayor de 18 años para registrarte";
        updateBirthDateError.classList.add('show');
        valid = false;
      }
  
      // Validación de la contraseña actual
      if (currentPassword.value === '') {
        currentPasswordError.classList.add('show');
        valid = false;
      }
  
      // Validación de la nueva contraseña
      if (newPassword.value !== '' && !validarPassword(newPassword.value)) {
        valid = false;
      }
  
      // Validación de la confirmación de la nueva contraseña
      if (newPassword.value !== confirmPassword.value) {
        confirmPasswordError.classList.add('show');
        valid = false;
      }
  
      // Si todos los campos son válidos, procede con la actualización
      if (valid) {
        console.log('Formulario válido, procediendo con la actualización');
  
        // Obtiene usuarios del localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
  
        // Busca el usuario por email y contraseña actual
        let userIndex = users.findIndex(user => user.email === updateEmail.value && user.password === currentPassword.value);
  
        if (userIndex === -1) {
          validationMessage.textContent = 'Usuario no encontrado o contraseña actual incorrecta';
          validationMessage.classList.add('show');
          return;
        }
  
        // Actualiza los datos del usuario
        users[userIndex].nombre = updateName.value;
        users[userIndex].apellido = updateLastName.value;
        users[userIndex].fechaNacimiento = updateBirthDate.value;
        if (newPassword.value !== '') {
          users[userIndex].password = newPassword.value;
        }
  
        // Guarda los usuarios actualizados en localStorage
        localStorage.setItem('users', JSON.stringify(users));
  
        console.log('Datos del usuario actualizados exitosamente');
        validationMessage.textContent = 'Datos actualizados correctamente';
        validationMessage.classList.add('show');
      }
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
  
    // Función para validar la contraseña
    function validarPassword(claveDigi) {
      let caracterSpecRegex = /([!@#$%^&*])/gm;
      let numeroRegex = /([0-9])/gm;
      let mayusculas = /([A-Z])/gm;
      let minusculas = /([a-z])/gm;
      let numDigitos = claveDigi.length;
      // Verifica la longitud de la contraseña
      if (!(numDigitos >= 8)) 
      { 
        validationMessage.textContent = "Clave no cumple con los caracteres solicitados";
        validationMessage.classList.add('show');
        return false;
      }
      // Verifica que la contraseña contenga números
      else if (!regexValid(claveDigi, numeroRegex)) {
        return false;
      } 
      // Verifica que la contraseña contenga caracteres especiales
      else if (!regexValid(claveDigi, caracterSpecRegex)) {
        return false;
      } 
      // Verifica que la contraseña contenga mayúsculas
      else if (!regexValid(claveDigi, mayusculas)) {
        return false;
      }
      // Verifica que la contraseña contenga minúsculas
      else if (!regexValid(claveDigi, minusculas)) {
        return false;
      }
      else {
        return true;
      }
    }
  
    // Función auxiliar para validar la contraseña con expresiones regulares
    const regexValid = (input, regex) => {
      let resultado = regex.test(input);
      if (!resultado){
        validationMessage.classList.add('show');
      }
      return resultado;
    };
});
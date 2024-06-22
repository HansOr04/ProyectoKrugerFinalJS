document.addEventListener('DOMContentLoaded', () => {
  const updateForm = document.getElementById('updateForm');
  const updateButton = document.getElementById('updateButton');

  const updateEmail = document.getElementById('updateEmail');
  const currentPassword = document.getElementById('currentPassword');
  const newPassword = document.getElementById('newPassword');
  const confirmPassword = document.getElementById('confirmPassword');

  const updateEmailError = document.getElementById('updateEmailError');
  const currentPasswordError = document.getElementById('currentPasswordError');
  const newPasswordError = document.getElementById('newPasswordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');
  const validationMessage = document.getElementById('validationMessage');

  // Función para mostrar mensajes en la consola y en la página
  function log(message) {
      console.log(message);
      let logElement = document.getElementById('log');
      if (!logElement) {
          logElement = document.createElement('div');
          logElement.id = 'log';
          logElement.style.whiteSpace = 'pre-wrap';
          document.body.appendChild(logElement);
      }
      logElement.textContent += message + '\n';
  }

  updateButton.addEventListener('click', (e) => {
      e.preventDefault();
      log('Botón de actualización clickeado');
      
      let valid = true;

      // Reset all error messages
      [updateEmailError, currentPasswordError, newPasswordError, confirmPasswordError, validationMessage].forEach(el => {
          el.classList.remove('show');
      });

      if (updateEmail.value === '') {
          updateEmailError.classList.add('show');
          valid = false;
      }

      if (currentPassword.value === '') {
          currentPasswordError.classList.add('show');
          valid = false;
      }

      if (newPassword.value === '') {
          newPasswordError.classList.add('show');
          valid = false;
      }

      if (confirmPassword.value !== newPassword.value) {
          confirmPasswordError.classList.add('show');
          valid = false;
      }

      if (valid && validatePassword(newPassword.value)) {
          log('Formulario válido, procediendo con la actualización');

          // Obtener usuarios del localStorage
          let users = JSON.parse(localStorage.getItem('users')) || [];

          // Encontrar usuario por email y contraseña actual
          let userIndex = users.findIndex(user => user.email === updateEmail.value && user.password === currentPassword.value);

          if (userIndex === -1) {
              validationMessage.textContent = 'Usuario no encontrado o contraseña actual incorrecta';
              validationMessage.classList.add('show');
              return;
          }

          // Actualizar la contraseña del usuario
          users[userIndex].password = newPassword.value;
          localStorage.setItem('users', JSON.stringify(users));

          log('Contraseña actualizada exitosamente');
      }
  });

  function validatePassword(password) {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);
      const hasSpecialChars = /[!@#\$%\^\&*\)\(+=._-]/.test(password);

      if (password.length < minLength) {
          validationMessage.textContent = 'La contraseña debe tener al menos ' + minLength + ' caracteres';
          validationMessage.classList.add('show');
          return false;
      }
      if (!hasUpperCase) {
          validationMessage.textContent = 'La contraseña debe tener al menos una letra mayúscula';
          validationMessage.classList.add('show');
          return false;
      }
      if (!hasLowerCase) {
          validationMessage.textContent = 'La contraseña debe tener al menos una letra minúscula';
          validationMessage.classList.add('show');
          return false;
      }
      if (!hasNumbers) {
          validationMessage.textContent = 'La contraseña debe tener al menos un número';
          validationMessage.classList.add('show');
          return false;
      }
      if (!hasSpecialChars) {
          validationMessage.textContent = 'La contraseña debe tener al menos un carácter especial';
          validationMessage.classList.add('show');
          return false;
      }

      validationMessage.classList.remove('show');
      return true;
  }
});

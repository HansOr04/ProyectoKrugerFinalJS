const mostrarMensajeBienvenida = () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users'));
    let user = users.find(user => user.email == currentUser.email);
    if (user) {
      document.getElementById('usuario').textContent = `${user.nombre} ${user.apellido}`;
    }
  };

  mostrarMensajeBienvenida();
document.addEventListener("DOMContentLoaded", function() {
    // Verifica si el usuario está autenticado
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "index.html"; // Redirige a la página de inicio de sesión
    }

    // Selecciona el botón de cerrar sesión
    const signOutButton = document.getElementById("signOut");

    // Agrega un event listener al botón de cerrar sesión
    signOutButton.addEventListener("click", function () {
        // Elimina la marca de inicio de sesión en localStorage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        alert("Sesión cerrada exitosamente");
        // Redirige a la página de inicio de sesión
        window.location.href = "index.html"; // Cambia a tu página de inicio de sesión
    });
});

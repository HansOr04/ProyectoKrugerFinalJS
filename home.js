
// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
  // Selecciona el contenedor de productos en el DOM
  const productsContainer = document.querySelector('.container-products');

  // Función para obtener el usuario actual del localStorage
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
  };

  // Función para obtener los favoritos del usuario actual
  const getCurrentUserFavorites = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      // Retorna los favoritos del usuario o un array vacío si no existen
      return JSON.parse(localStorage.getItem(`favorites_${currentUser.email}`)) || [];
    }
    return [];
  };

  // Función para guardar los favoritos del usuario actual
  const setCurrentUserFavorites = (favorites) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      localStorage.setItem(`favorites_${currentUser.email}`, JSON.stringify(favorites));
    }
  };

  // Función para mostrar los productos favoritos en el HTML
  const showHTML = (favoriteProducts) => {
    // Limpia el contenedor de productos
    productsContainer.innerHTML = '';

    if (favoriteProducts.length === 0) {
      // Muestra un mensaje si no hay favoritos
      productsContainer.innerHTML = '<p>No hay productos favoritos.</p>';
    } else {
      // Itera sobre los productos favoritos y crea las tarjetas de producto
      favoriteProducts.forEach(product => {
        const productCard = `
          <div class="card-product">
            <div class="container-img">
              <img src="${product.imageUrl}" alt="Product Image" />
            </div>
            <div class="content-card-product" data-product-id="${product.id}">
              <h3>${product.city}</h3>
              <h4>${product.sector}</h4>
              <p>${product.streetName}, ${product.streetNumber}</p>
              <p>Área: ${product.areaSize}</p>
              <p>Año de construcción: ${product.yearBuilt}</p>
              <p>Precio de alquiler: $${product.rentPrice}/mes</p>
              <p>Fecha disponible: ${product.dateAvailable}</p>
              <button class="btn-remove-favorite" data-product-id="${product.id}">
                Eliminar de favoritos
              </button>
            </div>
          </div>
        `;
        // Añade la tarjeta al contenedor
        productsContainer.innerHTML += productCard;
      });

      // Añade event listeners a los botones de eliminar favorito
      const removeButtons = document.querySelectorAll('.btn-remove-favorite');
      removeButtons.forEach(button => {
        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-product-id');
          removeFromFavorites(productId);
        });
      });
    }
  };

  // Función para eliminar un producto de favoritos
  const removeFromFavorites = (productId) => {
    // Obtiene los favoritos actuales
    let favorites = getCurrentUserFavorites();
    // Filtra el producto a eliminar
    favorites = favorites.filter(product => product.id !== productId);
    // Guarda los favoritos actualizados
    setCurrentUserFavorites(favorites);
    // Actualiza la visualización
    showHTML(favorites);
  };

  // Función para mostrar todos los favoritos
  const showFavorites = () => {
    const favoriteProducts = getCurrentUserFavorites();
    showHTML(favoriteProducts);
  };

  // Llama a la función para mostrar los favoritos al cargar la página
  showFavorites();

});

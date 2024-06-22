document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.querySelector('.container-products');

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
  };

  const getCurrentUserFavorites = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      return JSON.parse(localStorage.getItem(`favorites_${currentUser.email}`)) || [];
    }
    return [];
  };

  const setCurrentUserFavorites = (favorites) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      localStorage.setItem(`favorites_${currentUser.email}`, JSON.stringify(favorites));
    }
  };

  const showHTML = (favoriteProducts) => {
    productsContainer.innerHTML = '';

    if (favoriteProducts.length === 0) {
      productsContainer.innerHTML = '<p>No hay productos favoritos.</p>';
    } else {
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
        productsContainer.innerHTML += productCard;
      });

      const removeButtons = document.querySelectorAll('.btn-remove-favorite');
      removeButtons.forEach(button => {
        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-product-id');
          removeFromFavorites(productId);
        });
      });
    }
  };

  const removeFromFavorites = (productId) => {
    let favorites = getCurrentUserFavorites();
    favorites = favorites.filter(product => product.id !== productId);
    setCurrentUserFavorites(favorites);
    showHTML(favorites);
  };

  const showFavorites = () => {
    const favoriteProducts = getCurrentUserFavorites();
    showHTML(favoriteProducts);
  };

  showFavorites();

});

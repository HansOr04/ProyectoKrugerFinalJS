// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
  // Selecciona el contenedor donde se mostrarán los productos
  const productsContainer = document.querySelector('.container-product');

  // Obtiene los productos del localStorage o inicializa un array vacío si no hay productos
  let productsLocalStorage = JSON.parse(localStorage.getItem('products')) || [];

  // Función para mostrar los productos en el HTML
  const showHTML = (productsToShow) => {
    // Limpia el contenedor de productos
    productsContainer.innerHTML = '';

    // Itera sobre cada producto y crea su representación HTML
    productsToShow.forEach(product => {
      // Crea una tarjeta de producto utilizando template literals
      const productCard = `
        <div class="card-product">
          <div class="container-img">
            <!-- Muestra la imagen del producto con un tamaño máximo del 30% del ancho -->
            <img src="${product.imageUrl}" alt="imagen Producto" style="max-width: 30%; height: auto;" />
          </div>
          <div class="content-card-product" data-product-id="${product.id}">
            <!-- Muestra los detalles del producto -->
            <h3>${product.city}</h3>
            <h4>${product.sector}</h4>
            <p>${product.streetName}</p>
            <p>${product.streetNumber}</p>
            <p>${product.areaSize}</p>
            <p>${product.yearBuilt}</p>
            <p>$${product.rentPrice}</p>
            <p>${product.dateAvailable}</p>
          </div>
        </div>
      `;

      // Agrega la tarjeta de producto al contenedor
      productsContainer.innerHTML += productCard;
    });
  };

  // Inicialización: muestra los productos almacenados en localStorage
  showHTML(productsLocalStorage);

});
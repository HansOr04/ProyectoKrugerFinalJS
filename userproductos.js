document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.container-product');
  
    let productsLocalStorage = JSON.parse(localStorage.getItem('products')) || [];
  
    const showHTML = (productsToShow) => {
      productsContainer.innerHTML = '';
  
      productsToShow.forEach(product => {
        const productCard = `
          <div class="card-product">
            <div class="container-img">
              <img src="${product.imageUrl}" alt="imagen Producto" style="max-width: 30%; height: auto;" />
            </div>
            <div class="content-card-product" data-product-id="${product.id}">
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
  
        productsContainer.innerHTML += productCard;
      });
    };
  
    // Inicialización
    showHTML(productsLocalStorage);

  });
  
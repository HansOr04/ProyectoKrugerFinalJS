
document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.querySelector('.container-products');
  const cityFilter = document.getElementById('city-filter');
  const priceFilter = document.getElementById('price-filter');
  const areaSizeFilter = document.getElementById('area-size-filter');

  const products = [
    { id: "1", imageUrl: "https://images.unsplash.com/photo-1603003568133-55b07aaf1860?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      city:"Quito", sector:"La Mariscal", streetName:"Santa Clara", streetNumber:"S479-458", areaSize:"75 mt", yearBuilt:"1997", rentPrice:"250,00", dateAvailable:"15-07-2024" },
    { id: "2", imageUrl: "https://media.istockphoto.com/id/2133653807/es/foto/foto-de-la-ciudad-de-benidorm-en-espa%C3%B1a-en-verano-que-muestra-el-frente-de-playa-y-los.jpg?s=2048x2048&w=is&k=20&c=soT10PL2yU1yhKM_aLheeDLVWbioR-Ps1Hk2YkqaBhM=", 
      city:"Quito", sector:"La Jardineria", streetName:"San Carlos", streetNumber:"S789-244", areaSize:"150 mt", yearBuilt:"2013", rentPrice:"550,00", dateAvailable:"23-07-2024" },
    { id: "3", imageUrl: "https://img.freepik.com/foto-gratis/arquitectura-moderna-apartamentos_1268-14696.jpg?t=st=1718413983~exp=1718417583~hmac=3a27ff2a37f5eb54c674071ea9827195a9dbc4d0dc258f2aaf0d2414b00a846b&w=996", 
      city:"Guayaquil", sector:"Lomas Altas", streetName:"Garzota", streetNumber:"S453-229", areaSize:"100 mt", yearBuilt:"2018", rentPrice:"400,00", dateAvailable:"13-08-2024" },
    { id: "4", imageUrl: "https://img.freepik.com/foto-gratis/rascacielos-oficinas-distrito-negocios_107420-95735.jpg?t=st=1718414146~exp=1718417746~hmac=21428eab16228a85a45ed579fae326afcc03eaeeee128621fee62279bfb27ab9&w=996",
      city:"Guayaquil", sector:"Las Peñas", streetName:"Galamitina", streetNumber:"S454-129", areaSize:"200 mt", yearBuilt:"2015", rentPrice:"620,00", dateAvailable:"22-07-2024"},
    { id: "5", imageUrl: "https://img.freepik.com/foto-gratis/paisaje-analogico-ciudad-edificios_23-2149661457.jpg?t=st=1718414589~exp=1718418189~hmac=6ba154d416f49d67ae5b6f6d26587a090b94bdd3f047bf5355fbefb9932ba281&w=360", 
      city:"Manta", sector:"Las Peñas", streetName:"Galamitina", streetNumber:"S454-129", areaSize:"200 mt", yearBuilt:"2015", rentPrice:"350,00", dateAvailable:"13-08-2024" },
    { id: "6", imageUrl: "https://img.freepik.com/foto-gratis/tiro-vertical-edificio-blanco-cielo-despejado_181624-4575.jpg?t=st=1718414815~exp=1718418415~hmac=bfe0543bf9bd5b423d3b4af7fb61343031b81c2f47f558bf6c7c11e146ce99f6&w=360", 
      city:"Esmeraldas", sector:"Las Peñas", streetName:"Galamitina", streetNumber:"S454-129", areaSize:"200 mt", yearBuilt:"2015", rentPrice:"720,00", dateAvailable:"26-06-2024"}
  ];

  let productsLocalStorage = JSON.parse(localStorage.getItem('products')) || [];
  let TodosProductos = products.concat(productsLocalStorage);

  const getCurrentUserFavorites = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return JSON.parse(localStorage.getItem(`favorites_${currentUser.email}`)) || [];
    }
    return [];
  };

  const setCurrentUserFavorites = (favorites) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      localStorage.setItem(`favorites_${currentUser.email}`, JSON.stringify(favorites));
    }
  };

  let favorites = getCurrentUserFavorites();

  const showHTML = (filteredProducts) => {
    productsContainer.innerHTML = '';

    filteredProducts.forEach(product => {
      const isFavorite = favorites.some(favorite => favorite.id === product.id);

      const productCard = `
        <div class="card-product">
          <div class="container-img">
            <img src="${product.imageUrl}" alt="imagen Producto" />
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
            <div class="footer-card-product">
              <div class="container-buttons-card">
                <button class="favorite" data-product-id="${product.id}">
                  <i class="fa-${isFavorite ? 'solid' : 'regular'} fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      productsContainer.innerHTML += productCard;
    });

    addFavoriteListeners();
  };

  const addFavoriteListeners = () => {
    document.querySelectorAll('.favorite').forEach(button => {
      button.addEventListener('click', toggleFavorite);
    });
  };

  const toggleFavorite = (e) => {
    const button = e.currentTarget;
    const productId = button.dataset.productId;
    const product = TodosProductos.find(item => item.id === productId);

    if (!product) {
      console.error('Producto no encontrado:', productId);
      return;
    }

    const index = favorites.findIndex(favorite => favorite.id === productId);
    if (index > -1) {
      favorites.splice(index, 1);
      button.querySelector('i').classList.replace('fa-solid', 'fa-regular');
    } else {
      favorites.push(product);
      button.querySelector('i').classList.replace('fa-regular', 'fa-solid');
    }

    setCurrentUserFavorites(favorites);
  };

  const filterProducts = () => {
    const selectedCity = cityFilter.value;
    const selectedPrice = parseInt(priceFilter.value);
    const selectedAreaSize = parseInt(areaSizeFilter.value);

    const filteredProducts = TodosProductos.filter(product => {
      const productPrice = parseInt(product.rentPrice.replace(',', ''));
      const productAreaSize = parseInt(product.areaSize.replace(' mt', ''));
      return (selectedCity === '' || product.city === selectedCity) &&
             (isNaN(selectedPrice) || productPrice <= selectedPrice) &&
             (isNaN(selectedAreaSize) || productAreaSize <= selectedAreaSize);
    });

    showHTML(filteredProducts);
  };

  const updateCityFilter = () => {
    const cities = [...new Set(TodosProductos.map(product => product.city))];
    cityFilter.innerHTML = '<option value="">Todas las ciudades</option>';
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      cityFilter.appendChild(option);
    });
  };

  const updateTodosProductos = () => {
    productsLocalStorage = JSON.parse(localStorage.getItem('products')) || [];
    TodosProductos = products.concat(productsLocalStorage);
    updateCityFilter();
    filterProducts();
  };

  cityFilter.addEventListener('change', filterProducts);
  priceFilter.addEventListener('input', filterProducts);
  areaSizeFilter.addEventListener('change', filterProducts);

  window.addEventListener('storage', (e) => {
    if (e.key === 'products') {
      updateTodosProductos();
    }
  });

  window.saveNewProduct = (newProduct) => {
    newProduct.id = Date.now().toString();
    productsLocalStorage.push(newProduct);
    localStorage.setItem('products', JSON.stringify(productsLocalStorage));
    updateTodosProductos();
  };

  window.showFavorites = () => {
    const favoriteProducts = TodosProductos.filter(product => 
      favorites.some(favorite => favorite.id === product.id)
    );
    showHTML(favoriteProducts);
  };

  updateTodosProductos();
  showHTML(TodosProductos);
});

// Shared Tailwind CSS classes
const inputClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline";
const labelClasses = "block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2";
const buttonClasses = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
const errorClasses = "text-red-500 text-xs italic";

// Create a new department
class NewDepartment extends HTMLElement {
    connectedCallback() {
        this.render();
        this.form = this.querySelector('form');
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.querySelector('#image-input').addEventListener('change', this.handleImageChange);
        document.getElementById('clearStorage').addEventListener('click', this.clearLocalStorage);
        this.editingIndex = null;
    }

    render() {
        this.innerHTML = `
            <div class="bg-white dark:bg-zinc-800 min-h-screen flex flex-col items-center justify-center p-4">
                <h1 class="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">CREA UN NUEVO DEPARTAMENTO</h1>
                <form id="product-form" class="w-full max-w-md" novalidate>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        ${this.createInput("Ciudad", "city", "text", "Ingresa la ciudad", true)}
                        ${this.createInput("Sector", "sector", "text", "Ingresa el sector", true)}
                        ${this.createInput("Calle principal", "street-name", "text", "Ingresa la calle principal", true)}
                        ${this.createInput("Numero de la calle", "street-number", "number", "Ingresa el numero de la calle", true)}
                        ${this.createInput("Area", "area-size", "number", "Ingresa el area", true)}
                        ${this.createSelect("Cuenta con Aire Acondicionado", "has-ac", ["true", "false"], ["Si", "No"], true)}
                        ${this.createInput("Año de Construccion", "year-built", "number", "Ingresa el año de construccion", true)}
                        ${this.createInput("Precio de Renta", "rent-price", "number", "Ingresa el precio", true)}
                        ${this.createInput("Fecha Disponible", "date-available", "date", "", true)}
                        ${this.createFileInput("Imagen", "image-input", true)}
                    </div>
                    <div id="error-message" class="${errorClasses}"></div>
                    <button type="submit" id="submit-button" class="${buttonClasses}">Crear nuevo departamento</button>
                </form>
            </div>
        `;
    }

    createInput(labelText, id, type, placeholder, required = false) {
        return `
            <div class="w-full px-3 mb-6">
                <label for="${id}" class="${labelClasses}">${labelText}</label>
                <input type="${type}" id="${id}" name="${id}" class="${inputClasses}" placeholder="${placeholder}" ${required ? 'required' : ''}>
            </div>
        `;
    }

    createSelect(labelText, id, values, options, required = false) {
        const optionsHtml = options.map((option, index) => `<option value="${values[index]}">${option}</option>`).join('');
        return `
            <div class="w-full px-3 mb-6">
                <label for="${id}" class="${labelClasses}">${labelText}</label>
                <select id="${id}" name="${id}" class="${inputClasses}" ${required ? 'required' : ''}>
                    ${optionsHtml}
                </select>
            </div>
        `;
    }

    createFileInput(labelText, id, required = false) {
        return `
            <div class="w-full px-3 mb-6">
                <label for="${id}" class="${labelClasses}">${labelText}</label>
                <input type="file" id="${id}" name="${id}" class="${inputClasses}" ${required ? 'required' : ''}>
            </div>
        `;
    }

    handleSubmit(event) {
        event.preventDefault();

        const newProduct = {
            city: document.getElementById('city').value,
            sector: document.getElementById('sector').value,
            streetName: document.getElementById('street-name').value,
            streetNumber: document.getElementById('street-number').value,
            areaSize: document.getElementById('area-size').value,
            hasAC: document.getElementById('has-ac').value === 'true',
            yearBuilt: document.getElementById('year-built').value,
            rentPrice: document.getElementById('rent-price').value,
            dateAvailable: document.getElementById('date-available').value,
            imageUrl: localStorage.getItem('productImageUrl')
        };

        if (this.validateProduct(newProduct)) {
            if (this.editingIndex !== null) {
                // Actualizar departamento existente
                products[this.editingIndex] = newProduct;
                this.editingIndex = null;
                this.querySelector('#submit-button').textContent = 'Crear nuevo departamento';
            } else {
                // Añadir nuevo departamento
                products.push(newProduct);
            }
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
            this.form.reset();
            localStorage.removeItem('productImageUrl');
        } else {
            this.querySelector('#error-message').textContent = 'Por favor completa todos los campos.';
        }
    }

    validateProduct(product) {
        return (
            product.city &&
            product.sector &&
            product.streetName &&
            product.streetNumber &&
            product.areaSize &&
            product.yearBuilt &&
            product.rentPrice &&
            product.dateAvailable &&
            product.imageUrl
        );
    }

    handleImageChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;
            localStorage.setItem('productImageUrl', imageUrl);
        };
        reader.readAsDataURL(file);
    }

    clearLocalStorage() {
        localStorage.clear();
        console.log('¡LocalStorage limpiado!');
        renderProducts();
    }

    loadProductForEditing(product, index) {
        this.editingIndex = index;
        document.getElementById('city').value = product.city;
        document.getElementById('sector').value = product.sector;
        document.getElementById('street-name').value = product.streetName;
        document.getElementById('street-number').value = product.streetNumber;
        document.getElementById('area-size').value = product.areaSize;
        document.getElementById('has-ac').value = product.hasAC.toString();
        document.getElementById('year-built').value = product.yearBuilt;
        document.getElementById('rent-price').value = product.rentPrice;
        document.getElementById('date-available').value = product.dateAvailable;
        localStorage.setItem('productImageUrl', product.imageUrl);
        this.querySelector('#submit-button').textContent = 'Actualizar departamento';
    }
}

customElements.define('new-department', NewDepartment);

// Select the form and the container where products will be displayed
const productsContainer = document.querySelector('.container-products');

// Retrieve products from localStorage, or initialize as an empty array if none are found
let products = JSON.parse(localStorage.getItem('products')) || [];

// Function to render products
const renderProducts = () => {
    productsContainer.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('card-product', 'border', 'p-3', 'm-2', 'rounded', 'shadow-md');

        const contentCardProduct = document.createElement('div');
        contentCardProduct.classList.add('content-card-product');

        const image = document.createElement('img');
        image.src = product.imageUrl;
        image.classList.add('w-50', 'h-50', 'object-cover', 'mb-4');
        contentCardProduct.appendChild(image);

        const title = document.createElement('h3');
        title.classList.add('font-bold', 'text-xl', 'mb-2');
        title.textContent = `${product.city}, ${product.sector}`;
        contentCardProduct.appendChild(title);

        const description1 = document.createElement('p');
        description1.textContent = `
            Calle principal: ${product.streetName} - ${product.streetNumber}
            Area Size: ${product.areaSize} sqm
            Has AC: ${product.hasAC ? 'Yes' : 'No'}
            Year Built: ${product.yearBuilt}
            Date Available: ${new Date(product.dateAvailable).toLocaleDateString('es-ES')}
        `;
        contentCardProduct.appendChild(description1);

        const description2 = document.createElement('p');
        description2.textContent = `Rent Price: $${product.rentPrice}`;
        contentCardProduct.appendChild(description2);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('bg-yellow-500', 'hover:bg-yellow-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'focus:outline-none', 'focus:shadow-outline', 'mr-2');
        editButton.addEventListener('click', () => {
            const newDepartmentElement = document.querySelector('new-department');
            newDepartmentElement.loadProductForEditing(product, index);
            window.scrollTo(0, 0);
        });
        contentCardProduct.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'focus:outline-none', 'focus:shadow-outline');
        deleteButton.addEventListener('click', () => {
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
        });
        contentCardProduct.appendChild(deleteButton);

        productCard.appendChild(contentCardProduct);
        productsContainer.appendChild(productCard);
    });
};

// Render products on page load
renderProducts();
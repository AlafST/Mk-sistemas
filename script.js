const products = [
    { id: 1, name: "Apple Watch Series 4 GPS", price: 399.99, image: "assets/apple-watch.png" },
    { id: 2, name: "JBL Speaker", price: 89.99, image: "assets/jbl-speaker.png" },
    { id: 3, name: "Apple iPhone X 128GB", price: 999.99, image: "assets/iphone-x.png" },
    { id: 4, name: "Beats Headphones", price: 199.99, image: "assets/beats-headphones.png" },
    { id: 5, name: "Apple MacBook Pro", price: 1299.99, image: "assets/macbook-pro.png" },
    { id: 6, name: "Apple iPad Pro 64GB", price: 799.99, image: "assets/ipad-pro.png" },
    { id: 7, name: "Apple HomePod", price: 299.99, image: "assets/homepod.png" },
    { id: 8, name: "JBuds Air Wireless", price: 159.99, image: "assets/jlab-audio-wireless.png" }
];

let cart = [];

function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$${product.price.toFixed(2)}</p>
            <button class="buy-button" onclick="addToCart(${product.id})">COMPRAR</button>
        `;
        productGrid.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
        updateCartCount();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" alt="${item.name}">
                <span class="item-name">${item.name}</span>
            </div>
            <div class="item-actions">
                <button class="quantity-button" onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-button" onclick="increaseQuantity(${item.id})">+</button>
                <span>R$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `R$${total.toFixed(2)}`;
}

function increaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += 1;
        updateCart();
        updateCartCount();
    }
}

function decreaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    updateCart();
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.length;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

function initializeApp() {
    displayProducts();

    document.getElementById('cartIcon').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);

    document.getElementById('finishButton').addEventListener('click', () => {
        alert('Compra finalizada! Total: ' + document.getElementById('cartTotal').textContent);
        cart = [];
        updateCart();
        updateCartCount();
        toggleCart();
    });

    updateCartCount();
}

document.addEventListener('DOMContentLoaded', initializeApp);

// Initialize cart from localStorage, if available
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update Cart Counter
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (cart.length > 0) {
        cartCounter.textContent = cart.length; // Update counter with the number of items in the cart
        cartCounter.style.display = 'block'; // Show counter
    } else {
        cartCounter.style.display = 'none'; // Hide counter when no items are in the cart
    }
}

// Add to Cart Function (with product details)
function addToCart(productId) {
    // Find the product details on the product page
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    const productName = productElement.querySelector('h2').textContent;
    const productPrice = parseFloat(productElement.querySelector('p:last-of-type').textContent.replace('$', ''));
    const productSize = productElement.querySelector('select').value;
    const productImage = productElement.querySelector('img').src;

    // Create the product object to add to cart
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        size: productSize,
        image: productImage,
        quantity: 1
    };

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId && item.size === productSize);
    
    if (existingProductIndex >= 0) {
        // If product exists, increment quantity
        cart[existingProductIndex].quantity++;
    } else {
        // Otherwise, add the new product to the cart
        cart.push(product);
    }

    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart counter
    updateCartCounter();

    // Show product details
    alert(`Product ${productName} added to cart! Price: $${productPrice}, Size: ${productSize}`);
}

// Load Cart Items (for Cart Page)
function loadCartItems() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear previous content

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let totalPrice = 0;

    // Loop through each product in the cart and create the display
    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.className = 'cart-item';

        // Build the content for each cart item (name, image, price, quantity)
        productDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50" height="50">
            <p>${item.name} (${item.size})</p>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        `;

        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(item.id, item.size); // Remove product with matching size
        productDiv.appendChild(removeButton);

        cartContainer.appendChild(productDiv);

        // Calculate the total price of the cart
        totalPrice += item.price * item.quantity;
    });

    // Display the total price
    const totalElement = document.getElementById('cart-total');
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Remove from Cart Function
function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size)); // Remove item by ID and size
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    loadCartItems(); // Reload the cart items
    updateCartCounter(); // Update cart counter
}

// Clear the Entire Cart
function clearCart() {
    cart = []; // Empty the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Clear localStorage
    loadCartItems(); // Reload cart items
    updateCartCounter(); // Update cart counter
}

// Event Listener for Cart Page (Load items when DOM is ready)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCartItems);
} else {
    loadCartItems();
}

// Event listener to load cart counter when page is ready
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter(); // Update counter when page is loaded
});

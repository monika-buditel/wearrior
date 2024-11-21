// Initialize or retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load Cart Items
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';  // Clear previous content

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItems.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.className = 'cart-item';
        
        productDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50" height="50">
            <p>${item.name} (${item.size})</p>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        `;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(item.id, item.size); // Remove item by ID and size
        productDiv.appendChild(removeButton);

        cartContainer.appendChild(productDiv);
    });

    // Display the total price
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalElement = document.getElementById('cart-total');
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Remove from Cart Function
function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size)); // Remove item by ID and size
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    loadCartItems(); // Reload the cart items
}

// Clear Cart Function
function clearCart() {
    cart = []; // Empty the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Clear localStorage
    loadCartItems(); // Reload cart items
}

// Load Cart Items on Page Load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCartItems);
} else {
    loadCartItems();
}

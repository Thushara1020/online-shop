
const products = [
    { id: 1, name: "Gaming Laptop", price: 634000.00, },
    { id: 2, name: "Gaming Mouse", price: 22000.00, },
    { id: 3, name: "GAMING CHAIR", price: 88000.00, },
    { id: 4, name: "Mechanical Keyboard", price: 16900.00, },
    { id: 5, name: "MotherBoard", price: 73500.00, },
    { id: 6, name: "Monitor", price: 49000.00, },
    { id: 7, name: "RGB PC Case", price: 25500.00, },
    { id: 8, name: "Graphics Cards", price: 1035500.00, },
];


if (document.getElementById("product-card-list")) {
    const container = document.getElementById("product-card-list");
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Rs. ${product.price.toLocaleString()}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}


function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === id);
    if (!product) return;
    const itemIndex = cart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
}


if (document.getElementById("cart-items")) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            total += item.price * item.qty;
            const row = document.createElement("div");
            row.className = "cart-item";
            row.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span>x${item.qty}</span>
                <span class="cart-item-price">Rs. ${(item.price * item.qty).toLocaleString()}</span>
            `;
            container.appendChild(row);
        });
    }

    if (document.getElementById("total")) {
        document.getElementById("total").textContent = total.toLocaleString(undefined, { minimumFractionDigits: 2 });
    }
}


function placeOrder() {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}
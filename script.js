// Load cart from browser storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart
function addToCart(name, qtyId) {
  const value = document.getElementById(qtyId).value;
  const [quantity, price] = value.split("|");

  cart.push({
    name,
    quantity,
    price: Number(price)
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// 🔽 ADD YOUR CODE BELOW 🔽

function loadCart() {
  let html = "";
  let total = 0;
  let message = "Hello Vaarahi HomeFoods,%0A%0AOrder Details:%0A";

  cart.forEach(item => {
    html += `<p>${item.name} (${item.quantity}) – ₹${item.price}</p>`;
    total += item.price;
    message += `- ${item.name} (${item.quantity}) : ₹${item.price}%0A`;
  });

  message += `%0ATotal: ₹${total}`;

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = "Total: ₹" + total;

  window.whatsappMessage = message;
}

function checkout() {
  window.location.href =
    "https://wa.me/919494359748?text=" + window.whatsappMessage;
}
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").innerText = cart.length;
}

updateCartCount();


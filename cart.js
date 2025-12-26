/* =========================
   CART LOGIC (LOCAL STORAGE)
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD ITEM */
function addToCart(name, selectId) {
  const select = document.getElementById(selectId);
  if (!select) {
    alert("Error adding item");
    return;
  }

  const [quantity, price] = select.value.split("|");

  cart.push({
    name: name,
    quantity: quantity,
    price: parseInt(price)
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  alert(`${name} (${quantity}) added to cart`);
}

/* UPDATE CART COUNT */
function updateCartCount() {
  const countEl = document.getElementById("cartCount");
  if (countEl) {
    countEl.innerText = cart.length;
  }
}

/* LOAD CART PAGE */
function loadCart() {
  const cartItems = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;
  let message = "Hello VAARAHI HomeFoods,%0A%0A🛒 Order Details:%0A";

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <p>
        ${index + 1}. ${item.name} (${item.quantity}) – ₹${item.price}
      </p>
    `;
    total += item.price;
    message += `${index + 1}. ${item.name} (${item.quantity}) - ₹${item.price}%0A`;
  });

  totalEl.innerHTML = `Total: ₹${total}`;
  message += `%0A💰 Total Amount: ₹${total}`;

  window.whatsappMessage = message;
}

/* CHECKOUT TO WHATSAPP */
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  window.location.href =
    "https://wa.me/919494359748?text=" + window.whatsappMessage;
}

/* INIT COUNT ON PAGE LOAD */
document.addEventListener("DOMContentLoaded", updateCartCount);

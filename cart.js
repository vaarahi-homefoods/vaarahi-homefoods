/* ======================
   CART STORAGE
====================== */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ======================
   ADD TO CART
====================== */

function addToCart(name, selectId) {
  const select = document.getElementById(selectId);
  const [qty, price] = select.value.split("|");

  let cart = getCart();

  const existing = cart.find(item => item.name === name && item.qty === qty);

  if (existing) {
    existing.count += 1;
  } else {
    cart.push({
      name: name,
      qty: qty,
      price: Number(price),
      count: 1
    });
  }

  saveCart(cart);
  updateCartCount();
  alert(`${name} added to cart`);
}

/* ======================
   CART COUNT (HEADER)
====================== */

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.count, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

/* ======================
   LOAD CART COUNT ON PAGE LOAD
====================== */

document.addEventListener("DOMContentLoaded", updateCartCount);

/* ======================
   CART PAGE RENDER
====================== */

function loadCart() {
  const cart = getCart();
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.count;
    total += itemTotal;

    container.innerHTML += `
      <div class="cart-item">
        <strong>${item.name}</strong> (${item.qty})<br>
        ₹${item.price} × ${item.count} = ₹${itemTotal}
        <br>
        <button onclick="changeQty(${index}, -1)">−</button>
        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  totalEl.textContent = "Total: ₹" + total;
}

/* ======================
   CART ACTIONS
====================== */

function changeQty(index, delta) {
  const cart = getCart();
  cart[index].count += delta;

  if (cart[index].count <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  loadCart();
  updateCartCount();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  loadCart();
  updateCartCount();
}

/* ======================
   WHATSAPP CHECKOUT
====================== */

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let message = "🛒 *Vaarahi HomeFoods Order*%0A%0A";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.count;
    total += itemTotal;
    message += `• ${item.name} (${item.qty}) × ${item.count} = ₹${itemTotal}%0A`;
  });

  message += `%0A*Total: ₹${total}*`;

  const phone = "919494359748";
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

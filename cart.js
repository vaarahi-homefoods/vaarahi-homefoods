// ---------- CART STORAGE ----------
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ---------- ADD TO CART ----------
function addToCart(name, selectId) {
  const select = document.getElementById(selectId);
  const [qty, price] = select.value.split("|");

  let cart = getCart();

  const existing = cart.find(
    item => item.name === name && item.qty === qty
  );

  if (existing) {
    existing.count++;
  } else {
    cart.push({
      name,
      qty,
      price: Number(price),
      count: 1
    });
  }

  saveCart(cart);
  updateCartCount();
  alert(`${name} added to cart`);
}

// ---------- CART COUNT ----------
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.count, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

// ---------- LOAD CART PAGE ----------
function loadCart() {
  const cart = getCart();
  const container = document.getElementById("cartItems");
  let total = 0;
  let html = "";

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.count;
    total += itemTotal;

    html += `
      <div class="cart-item">
        <strong>${item.name}</strong><br>
        ${item.qty} × ₹${item.price} = ₹${itemTotal}

        <div class="qty-controls">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.count}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">✖</button>
      </div>
    `;
  });

  container.innerHTML = html || "<p>Your cart is empty</p>";
  document.getElementById("total").innerText = "Total: ₹" + total;

  updateCartCount();
}

// ---------- CHANGE QUANTITY ----------
function changeQty(index, change) {
  let cart = getCart();
  cart[index].count += change;

  if (cart[index].count <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  loadCart();
}

// ---------- REMOVE ITEM ----------
function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  loadCart();
}

// ---------- WHATSAPP CHECKOUT ----------
function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let message = "Hello Vaarahi HomeFoods,%0A%0AOrder Details:%0A";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.count;
    total += itemTotal;
    message += `- ${item.name} (${item.qty}) x ${item.count} = ₹${itemTotal}%0A`;
  });

  message += `%0ATotal: ₹${total}`;

  window.location.href =
    "https://wa.me/919494359748?text=" + message;
}

// ---------- LOAD COUNT ON EVERY PAGE ----------
document.addEventListener("DOMContentLoaded", updateCartCount);

/* ======================
   CART STORAGE
====================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ======================
   ADD TO CART
====================== */
function addToCart(productName, selectId) {
  const select = document.getElementById(selectId);
  const [qty, price] = select.value.split("|");

  const numericPrice = Number(price);

  // Check if item already exists
  const existing = cart.find(
    item => item.name === productName && item.qty === qty
  );

  if (existing) {
    existing.count += 1;
  } else {
    cart.push({
      name: productName,
      qty: qty,
      price: numericPrice,
      count: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart");
}

/* ======================
   UPDATE CART COUNT
====================== */
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.count, 0);

  const el = document.getElementById("cartCount");
  if (el) el.innerText = total;
}

/* ======================
   LOAD CART PAGE
====================== */
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let html = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.count;
    total += itemTotal;

    html += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.qty}</small>
        </div>

        <div class="qty-controls">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.count}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <div>₹${itemTotal}</div>

        <button class="remove-btn" onclick="removeItem(${index})">✕</button>
      </div>
    `;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = "Total: ₹" + total;
}

/* ======================
   CHANGE QUANTITY
====================== */
function changeQty(index, delta) {
  cart[index].count += delta;

  if (cart[index].count <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

/* ======================
   REMOVE ITEM
====================== */
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

/* ======================
   WHATSAPP CHECKOUT
====================== */
function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let msg = "Hello VAARAHI HomeFoods,%0A%0AOrder Details:%0A";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.count;
    total += itemTotal;
    msg += `• ${item.name} (${item.qty}) x ${item.count} = ₹${itemTotal}%0A`;
  });

  msg += `%0A*Total: ₹${total}*`;

  window.location.href =
    "https://wa.me/919494359748?text=" + msg;
}

/* INIT */
updateCartCount();

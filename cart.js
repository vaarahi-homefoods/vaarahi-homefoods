let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, selectId) {
  const select = document.getElementById(selectId);
  const [qty, price] = select.value.split("|");

  const existing = cart.find(
    item => item.name === name && item.qty === qty
  );

  if (existing) {
    existing.count += 1;
  } else {
    cart.push({
      name,
      qty,
      price: Number(price),
      count: 1
    });
  }

  saveCart();
  updateCartCount();
  alert("Added to cart!");
}

function updateCartCount() {
  const totalCount = cart.reduce((sum, i) => sum + i.count, 0);
  const el = document.getElementById("cartCount");
  if (el) el.innerText = totalCount;
}

/* ---------- CART PAGE ---------- */

function loadCart() {
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

        <button class="remove-btn" onclick="removeItem(${index})">✖</button>
      </div>
    `;
  });

  document.getElementById("cartItems").innerHTML = html || "<p>Cart is empty</p>";
  document.getElementById("total").innerText = "Total: ₹" + total;
}

function changeQty(index, delta) {
  cart[index].count += delta;

  if (cart[index].count <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  loadCart();
  updateCartCount();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  loadCart();
  updateCartCount();
}

function checkout() {
  let msg = "Hello Vaarahi HomeFoods,%0A%0AOrder Details:%0A";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.count;
    total += itemTotal;
    msg += `• ${item.name} (${item.qty}) x ${item.count} = ₹${itemTotal}%0A`;
  });

  msg += `%0ATotal: ₹${total}`;

  window.location.href =
    "https://wa.me/919494359748?text=" + msg;
}

updateCartCount();

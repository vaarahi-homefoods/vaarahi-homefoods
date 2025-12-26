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
  if (!select) return;

  const [qty, price] = select.value.split("|");

  let cart = getCart();

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

  saveCart(cart);
  updateCartCount();
}

// ---------- CART COUNT ----------
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.count, 0);

  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

// ---------- RENDER CART PAGE ----------
function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    if (totalEl) totalEl.textContent = "";
    return;
  }

  let total = 0;

  container.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.count;
    total += itemTotal;

    return `
      <div class="cart-item">
        <strong>${item.name}</strong><br>
        ${item.qty} × ₹${item.price} = ₹${itemTotal}
      </div>
    `;
  }).join("");

  if (totalEl) totalEl.textContent = `Total: ₹${total}`;
}

// ---------- LOAD ON EVERY PAGE ----------
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});

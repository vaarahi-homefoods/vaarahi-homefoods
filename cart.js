function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, selectId) {
  const select = document.getElementById(selectId);
  if (!select) return alert("Select not found");

  const parts = select.value.split("|");
  if (parts.length !== 2) return alert("Invalid value");

  const qty = parts[0];
  const price = Number(parts[1]);
  if (isNaN(price)) return alert("Price error");

  let cart = getCart();

  const item = cart.find(i => i.name === name && i.qty === qty);
  if (item) {
    item.count += 1;
  } else {
    cart.push({ name, qty, price, count: 1 });
  }

  saveCart(cart);
  updateCartCount();
  alert(`${name} added to cart`);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.count, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

document.addEventListener("DOMContentLoaded", updateCartCount);

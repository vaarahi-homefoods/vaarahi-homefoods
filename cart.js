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
  if (!select) {
    alert("Select not found ❌");
    return;
  }

  const value = select.value;
  if (!value.includes("|")) {
    alert("Invalid price format ❌");
    return;
  }

  const [qty, priceStr] = value.split("|");
  const price = Number(priceStr);

  if (isNaN(price)) {
    alert("Price error ❌");
    return;
  }

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
      price,
      count: 1
    });
  }

  saveCart(cart);
  updateCartCount();

  alert(`${name} (${qty}) added to cart ✅`);
}

// ---------- CART COUNT ----------
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.count, 0);

  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

// ---------- LOAD ON PAGE ----------
document.addEventListener("DOMContentLoaded", updateCartCount);

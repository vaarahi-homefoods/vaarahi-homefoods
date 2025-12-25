let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

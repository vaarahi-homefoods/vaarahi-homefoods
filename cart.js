function addToCart(name, selectId) {
  const select = document.getElementById(selectId);
  const value = select.value;

  alert("WORKING ✅ " + name + " | " + value);
}

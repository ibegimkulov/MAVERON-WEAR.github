document.addEventListener("DOMContentLoaded", () => {
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  const cartCounter = document.getElementById("cart-count");
  const resetButton = document.getElementById("reset-cart");

  // Установить начальное значение счётчика
  if (cartCounter) {
    cartCounter.textContent = cartCount;
  }

  // 🆕 NEW: восстановим массив товаров (если нужен)
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  // Добавление в корзину
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      cartCount++;
      localStorage.setItem("cartCount", cartCount);

      if (cartCounter) {
        cartCounter.textContent = cartCount;
        cartCounter.classList.add("cart-bounce");
        setTimeout(() => {
          cartCounter.classList.remove("cart-bounce");
        }, 400);
      }

      // 🆕 NEW: Сохраняем название и цену товара
      const productCard = e.target.closest(".product-card");
      const name = productCard?.querySelector(".product-title")?.innerText || "Неизвестный товар";
      const price = productCard?.querySelector(".product-price")?.innerText || "";

      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      cartItems.push(`${name} — ${price}`);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  });

  // Сброс корзины
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      cartCount = 0;
      localStorage.setItem("cartCount", cartCount);
      localStorage.removeItem("cartItems"); // 🆕 NEW: очищаем товары

      if (cartCounter) {
        cartCounter.textContent = cartCount;
        cartCounter.classList.add("cart-bounce");
        setTimeout(() => {
          cartCounter.classList.remove("cart-bounce");
        }, 400);
      }
    });
  }
});

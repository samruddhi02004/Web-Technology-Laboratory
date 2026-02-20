const themeToggle = document.getElementById("themeToggle");
const sparkleToggle = document.getElementById("sparkleToggle");
const cartCount = document.getElementById("cartCount");
const loadMoreBtn = document.getElementById("loadMore");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");

const CART_KEY = "rg-cart";

const savedTheme = localStorage.getItem("rg-theme");
const savedSparkle = localStorage.getItem("rg-sparkle");

if (savedTheme === "blush") {
  document.body.classList.add("theme-blush");
  if (themeToggle) themeToggle.checked = true;
}

if (savedSparkle === "off") {
  document.body.classList.add("sparkle-off");
  if (sparkleToggle) sparkleToggle.checked = false;
}

if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("theme-blush", themeToggle.checked);
    localStorage.setItem("rg-theme", themeToggle.checked ? "blush" : "rose");
  });
}

if (sparkleToggle) {
  sparkleToggle.addEventListener("change", () => {
    document.body.classList.toggle("sparkle-off", !sparkleToggle.checked);
    localStorage.setItem("rg-sparkle", sparkleToggle.checked ? "on" : "off");
  });
}

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const updateCartCount = () => {
  if (!cartCount) return;
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;
};

const addToCart = (button) => {
  const name = button.dataset.name;
  const price = Number(button.dataset.price || 0);
  const image = button.dataset.image || "";
  const id = name.toLowerCase().replace(/\s+/g, "-");

  const cart = getCart();
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, image, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
  button.textContent = "Added!";
  setTimeout(() => {
    button.textContent = "Add to Cart";
  }, 900);
};

const bindAddToCartButtons = () => {
  const buttons = document.querySelectorAll("[data-add-to-cart]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => addToCart(button));
  });
};

const renderCart = () => {
  if (!cartItemsEl || !cartTotalEl) return;
  const cart = getCart();
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Your cart is empty. Add something cute from the shop.</p>";
    cartTotalEl.textContent = "$0";
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price} x ${item.qty}</p>
      </div>
      <button class="btn ghost" data-remove="${item.id}">Remove</button>
    `;
    cartItemsEl.appendChild(row);
  });

  cartTotalEl.textContent = `$${total}`;

  cartItemsEl.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.remove;
      const nextCart = getCart().filter((item) => item.id !== id);
      saveCart(nextCart);
      renderCart();
      updateCartCount();
    });
  });
};

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    document.querySelectorAll(".is-hidden").forEach((card) => {
      card.classList.remove("is-hidden");
    });
    loadMoreBtn.style.display = "none";
  });
}

bindAddToCartButtons();
updateCartCount();
renderCart();

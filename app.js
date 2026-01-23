{
  id: 9,
  name: "AirPods Pro 2",
  category: "Audio",
  price: 20,
  desc: "Sonido premium, conexión rápida. Envío incluido 🚚📦",
  img: "https://images.unsplash.com/photo-1585386959984-a41552231693"
},
{
  id: 10,
  name: "AirPods 4",
  category: "Audio",
  price: 30,
  desc: "Excelente sonido, batería duradera. Envío incluido 🚚📦",
  img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf"
},

let cart = [];

const productGrid = document.getElementById("productGrid");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".cat-btn");

document.getElementById("openCart").addEventListener("click", () => {
  cartModal.style.display = "flex";
});

document.getElementById("closeCart").addEventListener("click", () => {
  cartModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === cartModal) cartModal.style.display = "none";
});

function renderProducts(list) {
  productGrid.innerHTML = "";

  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <div class="price">$${p.price}</div>
      <button onclick="addToCart(${p.id})">Agregar al carrito</button>
    `;

    productGrid.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  cart.push(product);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>
        <h5>${item.name}</h5>
        <small>${item.category}</small>
      </div>
      <div>
        <span>$${item.price}</span>
        <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
      </div>
    `;
    cartItems.appendChild(div);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
  cartCount.textContent = cart.length;
}

searchInput.addEventListener("input", () => {
  const text = searchInput.value.toLowerCase();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(text) ||
    p.category.toLowerCase().includes(text)
  );

  renderProducts(filtered);
});

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;

    if (category === "Todos") {
      renderProducts(products);
    } else {
      renderProducts(products.filter((p) => p.category === category));
    }
  });
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío 😅");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  alert(`Gracias por tu compra 🥳\nTotal a pagar: $${total.toFixed(2)}`);

  cart = [];
  updateCart();
  cartModal.style.display = "none";
});

renderProducts(products);






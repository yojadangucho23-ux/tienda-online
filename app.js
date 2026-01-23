const products = [
  {
    id: 1,
    name: "Airpods pro 2da gen",
    category: "Celulares",
    price: $20,
    desc: "Potente, elegante y con cancelacion de ruido.",
    img: "https://images.unsplash.com/photo-1631532151868-5e6a1b0b6d0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Laptop Gamer ASUS",
    category: "Computadoras",
    price: 899,
    desc: "Rendimiento brutal para juegos y trabajo.",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Audífonos Bluetooth",
    category: "Audio",
    price: 49,
    desc: "Sonido claro y batería duradera.",
    img: "https://images.unsplash.com/photo-1518441902117-f0a6a2b9a54d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Smartwatch Deportivo",
    category: "Accesorios",
    price: 79,
    desc: "Mide tu salud y rendimiento diario.",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Teclado Mecánico RGB",
    category: "Accesorios",
    price: 35,
    desc: "Ideal para gamers y productividad.",
    img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Parlante Portátil",
    category: "Audio",
    price: 59,
    desc: "Buen bajo y sonido potente para fiestas.",
    img: "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80"
  }
];

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



const menu = [
  {
    name: "Margherita Pizza",
    price: 250,
    img: "https://source.unsplash.com/400x300/?pizza"
  },
  {
    name: "Chicken Biryani",
    price: 180,
    img: "https://source.unsplash.com/400x300/?biryani"
  },
  {
    name: "Veg Burger",
    price: 120,
    img: "https://source.unsplash.com/400x300/?burger"
  },
  {
    name: "Paneer Tikka",
    price: 200,
    img: "https://source.unsplash.com/400x300/?paneer"
  },
  {
    name: "Cold Coffee",
    price: 90,
    img: "https://source.unsplash.com/400x300/?coffee"
  },
  {
    name: "Samosa Plate",
    price: 60,
    img: "https://source.unsplash.com/400x300/?samosa"
  }
];

const menuSection = document.getElementById("menu-section");
const cartList = document.getElementById("cart-list");
const totalPriceEl = document.getElementById("total-price");

let cart = [];

function renderMenu() {
  menu.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="info">
        <h3>${item.name}</h3>
        <div class="price">₹${item.price}</div>
        <button onclick="addToCart(${index})">Add to Cart</button>
      </div>
    `;
    menuSection.appendChild(card);
  });
}

function addToCart(index) {
  const item = menu[index];
  cart.push(item);
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price}</span>
    `;
    cartList.appendChild(li);
  });
  totalPriceEl.textContent = total;
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is empty!");
  } else {
    alert("Order placed successfully! 🍽️");
    cart = [];
    renderCart();
  }
});

renderMenu();


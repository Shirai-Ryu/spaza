import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyDP7N-NJ_PbOs41BbX6AgLZrBWdyP-odJU",
    authDomain: "espaza-login-final.firebaseapp.com",
    databaseURL: "https://espaza-login-final-default-rtdb.firebaseio.com",
    projectId: "espaza-login-final",
    storageBucket: "espaza-login-final.appspot.com",
    messagingSenderId: "358577580383",
    appId: "1:358577580383:web:af7778db3431aaa2c72eea"
  };

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



// Fetch Products from Firebase
function fetchProducts() {
  const productsRef = ref(database, 'Products');
  onValue(productsRef, (snapshot) => {
      const products = snapshot.val();
      displayProducts(Object.values(products));
  }, {
      onlyOnce: true
  });
}

// Display Products Function
function displayProducts(products) {
  document.getElementById('root').innerHTML = products.map((item, index) => {
      const {image, title, price} = item;
      return (
          `<div class='box'>
              <div class='img-box'>
                  <img class='images' src=${image} alt='Product Image'></img>
              </div>
              <div class='bottom'>
                  <p>${title}</p>
                  <h2>$ ${price}</h2>` +
                  `<button onclick='addToCart(${index})'>Add to cart</button>` +
              `</div>
          </div>`
      );
  }).join('');
}

// Add to Cart Function
var cart = [];
function addToCart(index) {
  cart.push({...products[index]});
  displayCart();
}

// Delete Element from Cart
function delElement(index) {
  cart.splice(index, 1);
  displayCart();
}

// Display Cart Function
function displayCart() {
  let total = 0;
  document.getElementById("count").innerHTML = cart.length;
  document.getElementById("cartItem").innerHTML = cart.map((item, index) => {
      total += item.price;
      return (
          `<div class='cart-item'>
              <div class='row-img'>
                  <img class='rowimg' src=${item.image} alt='Cart Image'></img>
              </div>
              <p style='font-size:12px;'>${item.title}</p>
              <h2 style='font-size: 15px;'>$ ${item.price}</h2>` +
              `<i class='fa-solid fa-trash' onclick='delElement(${index})'></i></div>`
      );
  }).join('');
  document.getElementById("total").innerHTML = "$ " + total + ".00";
}

// Load Products when Document is Ready
document.addEventListener('DOMContentLoaded', fetchProducts);


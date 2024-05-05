import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "your-database-url",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function monitorOrders() {
  const ordersRef = ref(db, 'Customers');
  onValue(ordersRef, (snapshot) => {
    const orders = snapshot.val();
    // Update the UI to show orders
    console.log("Orders updated:", orders);
  });
}

window.monitorOrders = monitorOrders;

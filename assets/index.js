
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGZDdTO2x0jRxamCL_VpxtsCH_AzBJEpQ",
  authDomain: "ezhire-cb1e3.firebaseapp.com",
  projectId: "ezhire-cb1e3",
  storageBucket: "ezhire-cb1e3.appspot.com",
  messagingSenderId: "97650938310",
  appId: "1:97650938310:web:d1b074e103aa79138662c7",
  measurementId: "G-L2F971LW4K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("hello");
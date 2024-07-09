// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);


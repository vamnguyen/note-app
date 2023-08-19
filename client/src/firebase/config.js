// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp8gFQRs4ABcJ1vXksBGzxGNlPNW-tRCc",
  authDomain: "note-app-4ef14.firebaseapp.com",
  projectId: "note-app-4ef14",
  storageBucket: "note-app-4ef14.appspot.com",
  messagingSenderId: "781441220908",
  appId: "1:781441220908:web:558a7b6460c403512d6c89",
  measurementId: "G-36V4E214YS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

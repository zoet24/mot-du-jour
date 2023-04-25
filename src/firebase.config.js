// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpnM29nHUG5wu3UEcTLg4TB_QihVqndyA",
  authDomain: "mot-du-jour-3b9ad.firebaseapp.com",
  projectId: "mot-du-jour-3b9ad",
  storageBucket: "mot-du-jour-3b9ad.appspot.com",
  messagingSenderId: "576942470367",
  appId: "1:576942470367:web:e4b7078ead9163e332256a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };

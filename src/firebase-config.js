// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6q8l9ysd5vCc-e9S14-68LGZHp6edKoc",
  authDomain: "precup-97461.firebaseapp.com",
  projectId: "precup-97461",
  storageBucket: "precup-97461.appspot.com",
  messagingSenderId: "998746390685",
  appId: "1:998746390685:web:c757be94bd0c5338675474",
  measurementId: "G-ZXHFF970CY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };

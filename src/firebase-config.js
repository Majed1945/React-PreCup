// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAibKMMG_EnkLiYtC4d54eekmpytT5P88g",
  authDomain: "precup-228f9.firebaseapp.com",
  projectId: "precup-228f9",
  storageBucket: "precup-228f9.appspot.com",
  messagingSenderId: "101095871812",
  appId: "1:101095871812:web:1cb26584c1e250031a7311",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };

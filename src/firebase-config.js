// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBudJty68KO8BvpLbr1zd8Ljk5xcsHI07M",
  authDomain: "precuptest.firebaseapp.com",
  projectId: "precuptest",
  storageBucket: "precuptest.appspot.com",
  messagingSenderId: "860884544813",
  appId: "1:860884544813:web:7c23a3cc4cee4e8ea6f7a4",
  measurementId: "G-082D64GWDL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };

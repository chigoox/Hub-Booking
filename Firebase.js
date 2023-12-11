// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4_UH1UNmsC5HERHGEJbErWpASdUndTmw",
  authDomain: "investa-5.firebaseapp.com",
  projectId: "investa-5",
  storageBucket: "investa-5.appspot.com",
  messagingSenderId: "579043183122",
  appId: "1:579043183122:web:7518dd56467b5c9b5566cb",
  measurementId: "G-DWY6WE72EM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DATABASE = getFirestore(app);
const AUTH = getAuth(app)
const STORAGE = getStorage(app)


export default app
export { AUTH, DATABASE, STORAGE };


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
  apiKey: "AIzaSyB0IKtE3ykC3_MDI0N7xOxwSHFn1561gfQ",
  authDomain: "thehub-778d1.firebaseapp.com",
  projectId: "thehub-778d1",
  storageBucket: "thehub-778d1.appspot.com",
  messagingSenderId: "794134074750",
  appId: "1:794134074750:web:ec9908ec5331a58dd58f2f",
  measurementId: "G-EK213MY3KB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DATABASE = getFirestore(app);
const AUTH = getAuth(app)
const STORAGE = getStorage(app)


export default app
export { AUTH, DATABASE, STORAGE };


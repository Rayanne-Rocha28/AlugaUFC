// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHK7gFrhiNAp3mWUlDS68yRoF0ovIFM8I",
  authDomain: "aluga-ufc.firebaseapp.com",
  projectId: "aluga-ufc",
  storageBucket: "aluga-ufc.appspot.com",
  messagingSenderId: "534452709563",
  appId: "1:534452709563:web:e7aa991a09a9d8fc3ca19e",
  measurementId: "G-Z8H8X5SJBK"
};

// Initialize Firebase

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);




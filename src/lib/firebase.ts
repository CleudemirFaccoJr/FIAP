// src/lib/firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8uRK9e-VAPZatJeWIIYaUPHxCWAwMP9o",
  authDomain: "fiap---bytebank.firebaseapp.com",
  projectId: "fiap---bytebank",
  storageBucket: "fiap---bytebank.firebasestorage.app",
  messagingSenderId: "896567907440",
  appId: "1:896567907440:web:e4d451aea9c13cd1bc10b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Garante que o Firebase só será inicializado uma vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exporta os serviços que você vai usar
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };

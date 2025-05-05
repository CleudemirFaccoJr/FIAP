// src/lib/firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8uRK9e-VAPZatJeWIIYaUPHxCWAwMP9o",
  authDomain: "fiap---bytebank.firebaseapp.com",
  projectId: "fiap---bytebank",
  storageBucket: "fiap---bytebank.firebasestorage.app",
  messagingSenderId: "896567907440",
  appId: "1:896567907440:web:e4d451aea9c13cd1bc10b5"
};

// Garante que o Firebase só será inicializado uma vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exporta os serviços que você vai usar
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, app, database };

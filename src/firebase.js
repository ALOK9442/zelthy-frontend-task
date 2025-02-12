// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt9mTCiqEkvEnQAFIAPCHDsUjqu-HBqaA",
  authDomain: "schedulerly-dd9c0.firebaseapp.com",
  projectId: "schedulerly-dd9c0",
  storageBucket: "schedulerly-dd9c0.firebasestorage.app",
  messagingSenderId: "462130825351",
  appId: "1:462130825351:web:51afe83cdbc8ff1ed89022"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

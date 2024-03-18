import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyD0wnJP_6mKwq41gN8GFVOj5hIuQdgRMjA",
  authDomain: "vango-12aaf.firebaseapp.com",
  projectId: "vango-12aaf",
  storageBucket: "vango-12aaf.appspot.com",
  messagingSenderId: "644481206377",
  appId: "1:644481206377:web:7afad7bd094356a016faf8",
  measurementId: "G-H9MWS87TY1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

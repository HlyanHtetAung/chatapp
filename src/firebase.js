import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfsXF6pnn-hCThumPlVA8fLQQVo1kTEn0",
  authDomain: "chatapp-91634.firebaseapp.com",
  projectId: "chatapp-91634",
  storageBucket: "chatapp-91634.appspot.com",
  messagingSenderId: "187405172232",
  appId: "1:187405172232:web:d77873aee3f38690225bbd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

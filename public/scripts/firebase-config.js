import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCgPw3ir9lNG_vwbDZjOITXyxTeDtfG2D8",
    authDomain: "fcbekeryoder.firebaseapp.com",
    projectId: "fcbekeryoder",
    storageBucket: "fcbekeryoder.firebasestorage.app",
    messagingSenderId: "291208568020",
    appId: "1:291208568020:web:b3ba86bb01bd6f88faaf41",
    measurementId: "G-RF489VWJLN"
  };;

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
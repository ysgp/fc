import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getFirestore, collection, doc, 
    addDoc, getDocs, onSnapshot,
    query, where, orderBy, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { 
    getAuth, signInWithEmailAndPassword, 
    signOut 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCgPw3ir9lNG_vwbDZjOITXyxTeDtfG2D8",
    authDomain: "fcbekeryoder.firebaseapp.com",
    projectId: "fcbekeryoder",
    storageBucket: "fcbekeryoder.firebasestorage.app",
    messagingSenderId: "291208568020",
    appId: "1:291208568020:web:b3ba86bb01bd6f88faaf41",
    measurementId: "G-RF489VWJLN"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, doc, addDoc, getDocs, onSnapshot, 
         query, where, orderBy, serverTimestamp, signInWithEmailAndPassword, signOut };
// assets/js/firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    limit,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// Ganti nilai di bawah dengan firebaseConfig milik Anda dari Langkah 1
const firebaseConfig = {
    apiKey: "AIzaSyDYOQdxwPTWQilwKQEMle4mEmRzQcVSgLM",
    authDomain: "undangan-gunawan-vista.firebaseapp.com",
    projectId: "undangan-gunawan-vista",
    storageBucket: "undangan-gunawan-vista.firebasestorage.app",
    messagingSenderId: "567897007608",
    appId: "1:567897007608:web:84af8961e10b0b891da20d",
    measurementId: "G-ECK9D3YWWB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
console.log('🔥 Firebase initialized successfully! Project:', firebaseConfig.projectId);
export { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, setDoc} from 'firebase/firestore';
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGfjDprJtPuSkFxDHOrNkg4N031KbA1Tc",
  authDomain: "fir-ly-rec.firebaseapp.com",
  projectId: "fir-ly-rec",
  storageBucket: "fir-ly-rec.firebasestorage.app",
  messagingSenderId: "438184713168",
  appId: "1:438184713168:web:5f3649d60d71837fd2f7d5",
  measurementId: "G-EMY8G39F8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};
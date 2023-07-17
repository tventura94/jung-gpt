// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAppCheck } from "firebase/app-check";
import { ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTj2O54OA5PLUGeTlj_cJfnnir5vBcXj0",
  authDomain: "junggpt.firebaseapp.com",
  projectId: "junggpt",
  storageBucket: "junggpt.appspot.com",
  messagingSenderId: "388345785686",
  appId: "1:388345785686:web:a35b074bafc5eeb69bfaf7",
  measurementId: "G-4Q7PD82HH8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

// Initialize database

export const db = getFirestore();

// Get User Data

export async function getUserData(email) {
  if (!email) {
    return;
  }

  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}

// Collection Reference

export const colRefUsers = collection(db, "users");

// Add documents

export default function addDefault() {
  // Nothing function for default export because everything else was Async
}

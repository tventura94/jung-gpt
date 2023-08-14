// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAppCheck } from "firebase/app-check";
import { ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

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
const analytics = getAnalytics(app);
logEvent(analytics, "notification_received");
export const auth = getAuth();

let pageEnterTime = new Date().getTime();
let currentPagePath = ""; // Define it outside the function to make it accessible

export function logPageView(pageName) {
  const currentTime = new Date().getTime();

  if (pageEnterTime) {
    const timeSpentOnPage = (currentTime - pageEnterTime) / 1000;
    logEvent(analytics, "time_spent_on_page", {
      page_path: pageName,
      time_spent: timeSpentOnPage,
    });
  }

  logEvent(analytics, "page_view", {
    page_path: pageName,
    page_title: pageName,
  });

  pageEnterTime = currentTime;
  currentPagePath = pageName; // Store the current page path here
}

// Optionally log the time spent on the last page before the user leaves
window.addEventListener("beforeunload", () => {
  const currentTime = new Date().getTime();
  const timeSpentOnPage = (currentTime - pageEnterTime) / 1000; // Converting to seconds
  logEvent(analytics, "time_spent_on_page", {
    page_path: currentPagePath, // Now it can be accessed here
    time_spent: timeSpentOnPage,
  });
});
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
    return null;
  }
}

// Collection Reference

export const colRefUsers = collection(db, "users");

// Add documents

export default function addDefault() {
  // Nothing function for default export because everything else was Async
}

// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHrH_mGCMThc9ZuIWtUabxFfyRm0XLlk4",
  authDomain: "tcpc-ranking.firebaseapp.com",
  projectId: "tcpc-ranking",
  storageBucket: "tcpc-ranking.firebasestorage.app",
  messagingSenderId: "489242715134",
  appId: "1:489242715134:web:db09365ded11a43fe196af",
  measurementId: "G-99MCH3JXM2"
};

// Initialize Firebase
export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

 export const auth = getAuth(app);
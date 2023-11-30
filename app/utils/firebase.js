// Import the functions you need from the SDKs you need
import dotenv from "dotenv"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock_key",
  authDomain: "interviewbot-f5afb.firebaseapp.com",
  projectId: "interviewbot-f5afb",
  storageBucket: "interviewbot-f5afb.appspot.com",
  messagingSenderId: "880474515352",
  appId: "1:880474515352:web:151e00fa81b4a2a859eded",
  measurementId: "G-0X2ZXT6R63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};
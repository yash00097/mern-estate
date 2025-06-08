// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "marvel-estate.firebaseapp.com",
  projectId: "marvel-estate",
  storageBucket: "marvel-estate.firebasestorage.app",
  messagingSenderId: "575497207384",
  appId: "1:575497207384:web:3f479da79d3bda3ef6142d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
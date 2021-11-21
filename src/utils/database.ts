import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTRvSDvDtjLKxXbcR780a82gtpV9hYcUw",
  authDomain: "css-portrait-gen.firebaseapp.com",
  projectId: "css-portrait-gen",
  storageBucket: "css-portrait-gen.appspot.com",
  messagingSenderId: "918190488807",
  appId: "1:918190488807:web:1447461315fda234eab642",
  measurementId: "G-CTZPKQWQX2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Shared Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8n_wkEB_pghqRbvcZfJ_wOD1iZxoI778",
  authDomain: "mylaosmile-7642e.firebaseapp.com",
  projectId: "mylaosmile-7642e",
  storageBucket: "mylaosmile-7642e.firebasestorage.app",
  messagingSenderId: "344355987918",
  appId: "1:344355987918:web:0bb168a800969534500b9f",
  measurementId: "G-0H715R7HKQ"
};

// Initialize Firebase (singleton)
const app = initializeApp(firebaseConfig);

// Export shared instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

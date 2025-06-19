// Firebase authentication configuration
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8n_wkEB_pghqRbvcZfJ_wOD1iZxoI778",
  authDomain: "mylaosmile-7642e.firebaseapp.com",
  projectId: "mylaosmile-7642e",
  storageBucket: "mylaosmile-7642e.firebasestorage.app",
  messagingSenderId: "344355987918",
  appId: "1:344355987918:web:0bb168a800969534500b9f",
  measurementId: "G-0H715R7HKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Authentication functions
export const signInAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signOutAdmin = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Firebase authentication configuration
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";
// Authentication functions
export const signInAdmin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
};
export const signOutAdmin = async () => {
    try {
        await signOut(auth);
        return { success: true };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
};
// Export auth instance
export { auth };

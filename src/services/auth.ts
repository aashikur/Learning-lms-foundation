import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


const provider = new GoogleAuthProvider();

export async function LoginInWithGoogle() {
    try {
        const res = await signInWithPopup(auth, provider);
        return res.user;
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;
    }
}


export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    }
}
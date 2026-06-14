import { config } from "@/config";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";

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

export async function syncUserToDatabase(FirebaseUser: FirebaseUser) {
    try {

        const res = await fetch(`${config.baseURL}/api/auth/sync`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: FirebaseUser.uid,
                email: FirebaseUser.email,
                name: FirebaseUser.displayName,
                photoURL: FirebaseUser.photoURL
            })
        });

        const data = await res.json();
        console.log("Sync response: ", data.user);
        return data.user;

    }
    catch (error) {
        console.error("Error syncing user to database:", error);
        throw error;
    }
}

export async function getCurrentUser(uid: string) {
    const res = await fetch(`${config.baseURL}/api/auth/me`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ uid })
    });

    const data = await res.json();
    return data.user;
}
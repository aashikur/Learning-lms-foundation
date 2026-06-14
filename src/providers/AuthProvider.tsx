"use client";

import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, syncUserToDatabase } from '@/services/auth.service';

// Defining our MongoDB user metadata interface
interface MongoUser {
    _id: string;
    uid: string;
    email: string;
    name: string;
    photoURL: string;
    role: 'student' | 'instructor' | 'admin';
    enrolledCourses: string[];
}

type AuthContextType = {
    user: FirebaseUser | null,
    mongoUser: MongoUser | null,
    loading: boolean,
    loginWithGoogle: () => Promise<void>,
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [mongoUser, setMongoUser] = useState<MongoUser | null>(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (FirebaseUser) => {
            setUser(FirebaseUser);

            if (FirebaseUser) {
                // Direct, clean call to your service layer
                const mongoData = await getCurrentUser(FirebaseUser.uid);
                setMongoUser(mongoData);
            } else {
                setMongoUser(null);
            }

            setLoading(false);
        })
        return () => unsubscribe();
    }, []);


    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        await signInWithPopup(auth, provider);
    };


    const logout = async () => {
        await signOut(auth);
    };


    return (
        <AuthContext.Provider value={{ user, mongoUser, loading, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
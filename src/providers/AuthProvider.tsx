"use client";

import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
    user: User | null,
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true
})

const AuthProvider = ({ children } : { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })
        return () => unsubscribe();
    },[])
  return (
     <AuthContext.Provider value={{ user, loading}}>
        {children}
     </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
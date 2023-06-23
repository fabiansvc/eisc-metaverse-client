import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { createContext, useContext, useEffect, useState } from "react";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        console.log("Error creating auth context");
    }
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState("");

    useEffect(() => {
        const suscribed = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                setUser("");
            } else {
                setUser(currentUser);
            }
        });
        return () => suscribed();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        try {
            const res = await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <authContext.Provider value={{loginWithGoogle, logout, user}}>
            {children}
        </authContext.Provider>);
}
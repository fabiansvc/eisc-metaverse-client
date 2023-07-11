import { GoogleAuthProvider, SignInMethod, onAuthStateChanged, signInWithCredential, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
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
            // Verifying that the email is @correounivalle.edu.co
            const email = res.user.email;
            if (email.endsWith("@correounivalle.edu.co")) {
                return { success: true, data: res };
            } else {
                // If the email is not @correounivalle.edu.co, log out the user and return an error
                await signOut(auth);
                return { success: false };
            }
        } catch (error) {
            return { success: false, error: error };
        }
    };
    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            console.error('Error al cerrar sesión: ', error);
            return { success: false, error: error };
        }
    };

    return (
        <authContext.Provider value={{loginWithGoogle, logout, user}}>
            {children}
        </authContext.Provider>
    );
}

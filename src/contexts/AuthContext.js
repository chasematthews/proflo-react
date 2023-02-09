import { useContext, createContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider,
    signInWithPopup,
    getAuth,
    signOut,
    onAuthStateChanged,
    OAuthProvider
} from 'firebase/auth';

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState()

    const googleSignIn = async() => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), provider)
    };

    const MSSignIn = async() => {
        const provider = new OAuthProvider('microsoft.com');
        await signInWithPopup(getAuth(), provider)
    };

    const logOut = () => {
        signOut(getAuth())
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
            setUser(currentUser)
        });
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value = {{ googleSignIn, MSSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
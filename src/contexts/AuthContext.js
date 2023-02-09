import { useContext, createContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider,
    signInWithPopup,
    getAuth,
    signOut,
    onAuthStateChanged,
    OAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile
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

    const signUp = (email, password, firstName, lastName) => {
        createUserWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const username = firstName + ' ' + lastName;
            updateProfile(user, {
                displayName: username,
            })
        })
    };

    const emailSignIn = (email, password) => {
        return signInWithEmailAndPassword(getAuth(), email, password);
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(getAuth(), email);
    }

    const logOut = () => {
        return signOut(getAuth())
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
        <AuthContext.Provider value = {{ googleSignIn, MSSignIn, signUp, emailSignIn, logOut, resetPassword, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
import React, { useContext } from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext()

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {

    //Sign in to ProFlo
    const signIn = async(event) => {
        event.preventDefault();
        //Sign in Firebase using popup auth and Google as the identity provider
        var provider = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), provider)
    }

    //Sign out of ProFlo
    const signOutUser = async(event) => {
        event.preventDefault();
        signOut(getAuth());
    }

    //Monitor Authentication
    const initFirebaseAuth = () => {
        onAuthStateChanged(getAuth(), authStateObserver)
    }
      
    const authStateObserver = (user) => {
        if (user) {
            console.log('true');
        } else {
            console.log('false')
        }
    }

    const value = {
        signIn,
        signOutUser,
        initFirebaseAuth
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    useAuth,
    AuthProvider
}
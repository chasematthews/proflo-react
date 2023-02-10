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
import {
    setDoc,
    getFirestore,
    doc
} from 'firebase/firestore'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState()
    const [userRef, setUserRef] = useState()

    const googleSignIn = async() => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), provider)
        .then((userCredential) => saveUser(userCredential))
    };

    const MSSignIn = async() => {
        const provider = new OAuthProvider('microsoft.com');
        await signInWithPopup(getAuth(), provider)
        .then((userCredential) => saveUser(userCredential))
    };

    const signUp = (email, password, firstName, lastName) => {
        createUserWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            saveUser(userCredential)
            const user = userCredential.user;
            const username = firstName + ' ' + lastName;
            updateProfile(user, {
                displayName: username,
            })
        })
    };

    const saveUser = async(userCredential) => {
        try {
            await setDoc(doc(getFirestore(), 'users', `${userCredential.user.uid}`), {
                name: userCredential.user.displayName
            });
        }
        catch(error) {
            console.log('Error writing new user to Firebase Database');
        }
    }

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
        onAuthStateChanged(getAuth(), async(currentUser) => {
            currentUser && await (setUserRef(doc(getFirestore(), 'users', `${currentUser.uid}`)))
            // await setUserRef(userRef)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value = {{ googleSignIn, MSSignIn, signUp, emailSignIn, logOut, resetPassword, userRef, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
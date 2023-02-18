import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged, OAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile} from 'firebase/auth';
import { setDoc, getFirestore, doc, getDoc} from 'firebase/firestore'

//Create a Context
const AuthContext = createContext()

//Define the Context
export const AuthContextProvider = ({children}) => {

    //Declare state variables - user and the reference database for that user.
    const [user, setUser] = useState()
    const [userRef, setUserRef] = useState()

    //Declare the google Sign In function
    const googleSignIn = async() => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), provider)
        .then(userCredential => assignUser(userCredential))
    };

    //Declare the MS Sign In function
    const MSSignIn = async() => {
        const provider = new OAuthProvider('microsoft.com');
        await signInWithPopup(getAuth(), provider)
        .then(userCredential => assignUser(userCredential))
    };

    //Declare the Sign Up function
    const signUp = (email, password, firstName, lastName) => {
        createUserWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            assignUser(userCredential)
            const user = userCredential.user;
            const username = firstName + ' ' + lastName;
            updateProfile(user, {
                displayName: username,
            })
        })
    };

    //If the user has not signed in before, create an entry for the user within the database
    const assignUser = async(userCredential) => {
        const userSnap = await getDoc(doc(getFirestore(), 'users', `${userCredential.user.uid}`));
        if (userSnap.data() === undefined) {
            saveUser(userCredential)
        }
    }

    //Create the user entry in the database and add initial data.
    const saveUser = async(userCredential) => {
        await setDoc(doc(getFirestore(), 'users', `${userCredential.user.uid}`), {
            name: userCredential.user.displayName
        })
    }

    //Define the sign in with Email and Password function.
    const emailSignIn = (email, password) => {
        return signInWithEmailAndPassword(getAuth(), email, password);
    };

    //Define the reset password function
    const resetPassword = (email) => {
        return sendPasswordResetEmail(getAuth(), email);
    }

    //Define the logout function
    const logOut = () => {
        return signOut(getAuth())
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setUserRef(doc(getFirestore(), 'users', `${currentUser.uid}`));
            }
        });
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
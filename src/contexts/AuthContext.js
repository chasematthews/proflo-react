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
    doc,
    updateDoc,
    getDoc
} from 'firebase/firestore'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState()
    const [userRef, setUserRef] = useState()
    const [companyRef, setCompanyRef] = useState()

    console.log(companyRef)

    const googleSignIn = async() => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), provider)
        .then(userCredential => assignUserCompany(userCredential))
    };

    const assignUserCompany = async(userCredential) => {
        const userSnap = await getDoc(doc(getFirestore(), 'users', `${userCredential.user.uid}`));
        if (userSnap.data() === undefined) {
            saveUser(userCredential)
        } if (userSnap.data() === undefined) {
            assignCompany(userCredential)
        }
    }

    const MSSignIn = async() => {
        const provider = new OAuthProvider('microsoft.com');
        await signInWithPopup(getAuth(), provider)
        .then(userCredential => assignUserCompany(userCredential))
    };

    const signUp = (email, password, firstName, lastName) => {
        createUserWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            assignUserCompany(userCredential)
            const user = userCredential.user;
            const username = firstName + ' ' + lastName;
            updateProfile(user, {
                displayName: username,
            })
        })
    };

    const saveUser = async(userCredential) => {
        await setDoc(doc(getFirestore(), 'users', `${userCredential.user.uid}`), {
            name: userCredential.user.displayName
        })
    }

    const assignCompany = async(userCredential) => {
        const companyUID = makeid(30);
        await updateDoc(doc(getFirestore(), 'users', `${userCredential.user.uid}`), {
            company: companyUID
        });
        await setDoc(doc(getFirestore(), 'companies', `${companyUID}`), {
            adminUID: userCredential.user.uid,
            adminName: userCredential.user.displayName
        })
        const companyDB = await doc(getFirestore(), 'companies', `${companyUID}`);
        setDoc(doc(companyDB, 'users', `${userCredential.user.uid}`), {
            name: userCredential.user.displayName
        })
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

    const makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
            setUser(currentUser);
        });
        onAuthStateChanged(getAuth(), async(currentUser) => {
            console.log('hello')
            await (setUserRef(doc(getFirestore(), 'users', `${currentUser.uid}`)))
            setCompanyRef(doc(getFirestore(), 'companies', `${(await getDoc(doc(getFirestore(), 'users', `${currentUser.uid}`))).data().company}`))
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value = {{ googleSignIn, MSSignIn, signUp, emailSignIn, logOut, resetPassword, userRef, companyRef, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
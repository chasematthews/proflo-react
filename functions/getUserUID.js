const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const firebaseConfig = {
    apiKey: "AIzaSyAONOFkOok3qVDpVy9hu42OSlKUSB-XVT0",
    authDomain: "proflo-d9ccc.firebaseapp.com",
    projectId: "proflo-d9ccc",
    storageBucket: "proflo-d9ccc.appspot.com",
    messagingSenderId: "888727536000",
    appId: "1:888727536000:web:f1f229291220661a6c0165",
    measurementId: "G-9L9NCQC9T7"
}

const initialiseFirebase = async() => {
    const app = await initializeApp(firebaseConfig);
    const auth = await getAuth().getUserByEmail('traceygc@live.com.au')
    return (auth.uid)
}

initialiseFirebase().then(result => console.log(result))
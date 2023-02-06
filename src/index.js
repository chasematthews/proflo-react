import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAONOFkOok3qVDpVy9hu42OSlKUSB-XVT0",
    authDomain: "proflo-d9ccc.firebaseapp.com",
    projectId: "proflo-d9ccc",
    storageBucket: "proflo-d9ccc.appspot.com",
    messagingSenderId: "888727536000",
    appId: "1:888727536000:web:f1f229291220661a6c0165",
    measurementId: "G-9L9NCQC9T7"
}

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

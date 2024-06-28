import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBGM_FmFJENsWi7q-hzKBapG6LETR0JDvA",
    authDomain: "gracias-20cb8.firebaseapp.com",
    projectId: "gracias-20cb8",
    storageBucket: "gracias-20cb8.appspot.com",
    messagingSenderId: "834890637676",
    appId: "1:834890637676:web:cf708499b53012d5f85349",
    measurementId: "G-RE5PD2YTSZ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export Firebase services
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { app, auth, firestore, storage };

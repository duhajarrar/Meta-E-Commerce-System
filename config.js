import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

export const firebaseConfig = {
    apiKey: "AIzaSyAeCMxhLz313UsAr8xFdDCLpwghE1nan4c",
    authDomain: "testregistration-cbec3.firebaseapp.com",
    projectId: "testregistration-cbec3",
    storageBucket: "testregistration-cbec3.appspot.com",
    messagingSenderId: "731109863491",
    appId: "1:731109863491:web:5fa78b0e7d5579a46124f6",
    measurementId: "G-3Y36SZEZV9"
  };
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default db;
import React from 'react';



import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import firebase from 'firebase'; removed
// import { firebaseConfig } from './config/firebase.js';
import AuthNavigator from './navigation/AuthNavigator';
import HomeScreen from './screens/HomeScreen.js';
import HomeScreen1 from './screens/HomeScreen1.js';
import { Provider } from 'react-redux'
import store from './store'


const firebaseConfig = {
  apiKey: "AIzaSyAeCMxhLz313UsAr8xFdDCLpwghE1nan4c",
  authDomain: "testregistration-cbec3.firebaseapp.com",
  projectId: "testregistration-cbec3",
  storageBucket: "testregistration-cbec3.appspot.com",
  messagingSenderId: "731109863491",
  appId: "1:731109863491:web:5fa78b0e7d5579a46124f6",
  measurementId: "G-3Y36SZEZV9"
}

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AuthNavigator />
      </Provider>
    );
  }
}



import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBol0JjoBN3Mlr1MHnpHk5QpHqVpLBx5iA",
    authDomain: "goosecart-ed780.firebaseapp.com",
    projectId: "goosecart-ed780",
    storageBucket: "goosecart-ed780.appspot.com",
    messagingSenderId: "360129176214",
    appId: "1:360129176214:web:af5ba2f5a72a280223d8b7",
    measurementId: "G-H399QRNTVY"
};

// let app; 
// if (firebase.apps.length == 0){
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app();
// }

// const auth = firebase.auth();
// export {auth, app};
// Initialize Firebase
let app;
let auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}

export { app, auth };
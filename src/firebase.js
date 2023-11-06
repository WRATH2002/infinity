// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "infinity-new.firebaseapp.com",
  projectId: "infinity-new",
  storageBucket: "infinity-new.appspot.com",
  messagingSenderId: "998487374341",
  appId: "1:998487374341:web:9bd76699f9c07d5b62ba6c",
};
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = firebase.firestore();
export default firebase;
export { db };
export const storage = getStorage(app);
// export const st = firebase.storage();

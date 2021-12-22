import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAS6P0zKsI0pVPBAxLyPI4VVpbfPqs9iVA",
  authDomain: "imovies-9cf3d.firebaseapp.com",
  projectId: "imovies-9cf3d",
  storageBucket: "imovies-9cf3d.appspot.com",
  messagingSenderId: "909136513685",
  appId: "1:909136513685:web:c9466cd90794785ed4699c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const FieldValue = firebase.firestore.FieldValue;

export { firebase, auth, db, storage, FieldValue };

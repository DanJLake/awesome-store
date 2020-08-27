import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //Config here
  apiKey: "AIzaSyDoZplr-nZkOSNKCGGv5D4CF2D95H0mD0o",
  authDomain: "awesome-store-b1853.firebaseapp.com",
  databaseURL: "https://awesome-store-b1853.firebaseio.com",
  projectId: "awesome-store-b1853",
  storageBucket: "awesome-store-b1853.appspot.com",
  messagingSenderId: "79052305007",
  appId: "1:79052305007:web:5398897b2f7b64e68fd39a",
  measurementId: "G-51YG9KSM0F",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

import firebaseSdk from "firebase";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebaseSdk.initializeApp(config);
console.log("app init");

const firebase = firebaseSdk;
const db = firebase.firestore();

/* if (!firebase.apps.length) {
  firebase.initializeApp(config); 
} */

// const db = firebase.firestore();
// const firebase = firebaseSdk;

export {
  db,
  firebase
};

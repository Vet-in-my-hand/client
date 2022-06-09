// import firebase from "firebase/app";
// import 'firebase/auth';
// import 'firebase/firestore';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: process.env.REATE_APP_API_KEY,
//   authDomain: process.env.REATE_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REATE_APP_DATABASE_URL,
//   projectId: process.env.REATE_APP_PROJECT_ID,
//   storageBucket: process.env.REATE_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REATE_APP_MESSAGIN_SENDER_ID,
//   appId: process.env.REATE_APP_APP_ID,
//   measurementId: process.env.REATE_APP_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyA904BPJW3gStaPtfdQdtUFMniR8y6BO_A",
  authDomain: "vet-in-my-hand.firebaseapp.com",
  databaseURL: "https://vet-in-my-hand-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vet-in-my-hand",
  storageBucket: "vet-in-my-hand.appspot.com",
  messagingSenderId: "962258377157",
  appId: "1:962258377157:web:a60e74c347aefa909a13ac",
  measurementId: "G-R9RPEGF6XL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const dbService = getFirestore(app);
// firebase.initializeApp(firebaseConfig);

// export const firebaseInstance = firebase;
// export const authService = firebase.auth();
// export const dbService = firebase.firestore();
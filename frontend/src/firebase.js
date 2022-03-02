  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB2R4VRVSNVrhdsg2nuHCaDBsmto3IvAi0",
//   authDomain: "domot-social.firebaseapp.com",
//   projectId: "domot-social",
//   storageBucket: "domot-social.appspot.com",
//   messagingSenderId: "174439525811",
//   appId: "1:174439525811:web:e3ccf5d08265e5d0fd2fc6",
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "mictokk.firebaseapp.com",
  projectId: "mictokk",
  storageBucket: "mictokk.appspot.com",
  messagingSenderId: "457147980249",
  appId: "1:457147980249:web:bf090f5c4cb46f5fd821c8",
  measurementId: "G-HTKMPNDNYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
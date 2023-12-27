// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1Ud1Wip59MsQoy0ARWqnzj8stHC9LsxY",
  authDomain: "brandguru-auth.firebaseapp.com",
  projectId: "brandguru-auth",
  storageBucket: "brandguru-auth.appspot.com",
  messagingSenderId: "158288044550",
  appId: "1:158288044550:web:9ba640a247ce00b6b61987",
  measurementId: "G-TXHVLHPP4B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const intitFirebase = () => {
    return app;
}
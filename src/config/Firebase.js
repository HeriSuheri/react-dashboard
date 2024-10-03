// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1VEGotEnJD5ioV21wQcRHiIeL4YSo14k",
  authDomain: "react-dashboard-fd9fc.firebaseapp.com",
  projectId: "react-dashboard-fd9fc",
  storageBucket: "react-dashboard-fd9fc.appspot.com",
  messagingSenderId: "946516326487",
  appId: "1:946516326487:web:b2eda24f9642e66d2e4b12",
  measurementId: "G-NKLQC8JLZS"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
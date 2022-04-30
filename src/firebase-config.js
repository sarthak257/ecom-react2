// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmH1YnIEr6-2gRzsJyd0YXdkhmpfPoNHg",
  authDomain: "ecomreact-1.firebaseapp.com",
  projectId: "ecomreact-1",
  storageBucket: "ecomreact-1.appspot.com",
  messagingSenderId: "57379131784",
  appId: "1:57379131784:web:372899605d7f9f75a4ea3d",
  measurementId: "G-WS1XWSYE1Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

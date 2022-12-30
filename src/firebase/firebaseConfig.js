// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeYzSkGNPSVLCMgP0wcjjE2Uro8ITWrSw",
  authDomain: "face-hasan.firebaseapp.com",
  projectId: "face-hasan",
  storageBucket: "face-hasan.appspot.com",
  messagingSenderId: "62192079408",
  appId: "1:62192079408:web:8bbee9f7d76a58b6cbd3f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
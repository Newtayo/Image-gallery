// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_xcyp8rQxNoK8aoIvAr6VnOrCpYdRcZc",
  authDomain: "image-galley-a8e51.firebaseapp.com",
  projectId: "image-galley-a8e51",
  storageBucket: "image-galley-a8e51.appspot.com",
  messagingSenderId: "783151751186",
  appId: "1:783151751186:web:8667f993ea8c7495ca38cb",
  measurementId: "G-VE81KY6NQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
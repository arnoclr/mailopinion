// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP6bc3JVCIwrt124Fo0p5sM1hTwgG3QyQ",
  authDomain: "mailopinion.firebaseapp.com",
  projectId: "mailopinion",
  storageBucket: "mailopinion.appspot.com",
  messagingSenderId: "424964489752",
  appId: "1:424964489752:web:bbafcbb1352cd4cbc7b96d",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
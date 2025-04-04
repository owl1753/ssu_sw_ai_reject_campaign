import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmeS3SclslZ-6G6y8L9ZfHgwreVTVnm3k",
  authDomain: "swairejectcampaign.firebaseapp.com",
  databaseURL: "https://swairejectcampaign-default-rtdb.firebaseio.com",
  projectId: "swairejectcampaign",
  storageBucket: "swairejectcampaign.firebasestorage.app",
  messagingSenderId: "481103560591",
  appId: "1:481103560591:web:da5fb44f45f87eb82cd5fa",
  measurementId: "G-VHSEF9SGPC"
};

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const firestore = getFirestore(firebase);

export default firebase;
export { analytics, firestore };
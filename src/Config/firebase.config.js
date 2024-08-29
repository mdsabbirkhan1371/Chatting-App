// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD51BiGGeTj_43iusNFEOZTTekfbuB7yxg',
  authDomain: 'chat-app-578c0.firebaseapp.com',
  projectId: 'chat-app-578c0',
  storageBucket: 'chat-app-578c0.appspot.com',
  messagingSenderId: '1009310869847',
  appId: '1:1009310869847:web:ef883c06beee14d67ff612',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();
export { auth, db };

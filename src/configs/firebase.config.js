import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAmtdjFopUAlww30HGF5aaZOCtQtu7vHsE",
  authDomain: "carbon-fora-a86fe.firebaseapp.com",
  projectId: "carbon-fora-a86fe",
  storageBucket: "carbon-fora-a86fe.firebasestorage.app",
  messagingSenderId: "659290111643",
  appId: "1:659290111643:web:e590738c49b4715882903e",
  measurementId: "G-18BSRHE5PW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
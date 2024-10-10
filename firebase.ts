// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import dotenv from 'dotenv';
// dotenv.config({ path: '.env.local' });
// Log all relevant environment variables
console.log('NEXT_PUBLIC_API_KEY:', process.env.NEXT_PUBLIC_API_KEY);
console.log('NEXT_PUBLIC_AUTH_DOMAIN:', process.env.NEXT_PUBLIC_AUTH_DOMAIN);
console.log('NEXT_PUBLIC_PROJECT_ID:', process.env.NEXT_PUBLIC_PROJECT_ID);
console.log('NEXT_PUBLIC_STORAGE_BUCKET:', process.env.NEXT_PUBLIC_STORAGE_BUCKET);
console.log('NEXT_PUBLIC_MESSAGING_SENDER_ID:', process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID);
console.log('NEXT_PUBLIC_APP_ID:', process.env.NEXT_PUBLIC_APP_ID);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
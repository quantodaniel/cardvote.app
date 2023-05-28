import { initializeApp } from "firebase/app";
import { getDatabase, onValue, get, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};

export { set, onValue, ref, get, app, db, getCurrentUser };

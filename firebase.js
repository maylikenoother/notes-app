import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCyrEHmvI50V9BvuBRKlrufH4v6PblMsQI",
  authDomain: "note-app-653a0.firebaseapp.com",
  projectId: "note-app-653a0",
  storageBucket: "note-app-653a0.appspot.com",
  messagingSenderId: "895476891886",
  appId: "1:895476891886:web:3070a3d0308a25e8fdb3ff",
  measurementId: "G-N3GR126DH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);
export const notesCollection = collection(db, "notes")
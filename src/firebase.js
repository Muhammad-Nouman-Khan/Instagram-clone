import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB7X2lnmCkGUmlTZ8ntb1aKcJ8l2Dw11GA",
  authDomain: "instagram-clone-cc0a0.firebaseapp.com",
  projectId: "instagram-clone-cc0a0",
  storageBucket: "instagram-clone-cc0a0.appspot.com",
  messagingSenderId: "465582642109",
  appId: "1:465582642109:web:51015909915af4b1a978d4",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { db, storage, auth };

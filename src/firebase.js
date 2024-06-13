import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCljbTjdq3ZZArnPdRUwe0hRveP4xIKf2Y",
  authDomain: "test-6bfec.firebaseapp.com",
  projectId: "test-6bfec",
  storageBucket: "test-6bfec.appspot.com",
  messagingSenderId: "989181991794",
  appId: "1:989181991794:web:613d295168c04e2c795beb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export {db,storage,auth};
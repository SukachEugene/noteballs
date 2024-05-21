import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCi4DVC0YhdUCp9gH_sLXhhwaIV8EqUzoU",
  authDomain: "noteballs-51153.firebaseapp.com",
  projectId: "noteballs-51153",
  storageBucket: "noteballs-51153.appspot.com",
  messagingSenderId: "637841827656",
  appId: "1:637841827656:web:164fab44203d764e72b57d"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    db,
    auth
}
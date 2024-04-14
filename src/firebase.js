import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDu6zwG97Wlf0yLnC5MVitU1r5SuqRK8Os",
  authDomain: "hungerwatch-cb019.firebaseapp.com",
  projectId: "hungerwatch-cb019",
  storageBucket: "hungerwatch-cb019.appspot.com",
  messagingSenderId: "116731140286",
  appId: "1:116731140286:web:cb0ca208783c30f83326ef",
  measurementId: "G-PQQ038XWYX",
  databaseURL: "https://hungerwatch-cb019-default-rtdb.firebaseio.com/",
};
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestoreDb = getFirestore(app);

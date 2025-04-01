import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB1qRh5clOQbObTJtTeJyQ8z2DtJiKH5gc",
  authDomain: "gen-lang-client-0413028725.firebaseapp.com",
  databaseURL: "https://gen-lang-client-0413028725-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gen-lang-client-0413028725",
  storageBucket: "gen-lang-client-0413028725.firebasestorage.app",
  messagingSenderId: "477192556244",
  appId: "1:477192556244:web:5b260bb3e51019be9ab541",
  measurementId: "G-RS80SSZ10E"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
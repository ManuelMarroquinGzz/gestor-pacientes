import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_2bNL45UrXkYsRalnU3i8n7PlSjpm5vo",
    authDomain: "pacientes-d1.firebaseapp.com",
    projectId: "pacientes-d1",
    storageBucket: "pacientes-d1.firebasestorage.app",
    messagingSenderId: "699644796740",
    appId: "1:699644796740:web:04e75a9f71336be05ec111"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

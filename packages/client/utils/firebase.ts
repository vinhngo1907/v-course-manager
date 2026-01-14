// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDSVF0xZPoAsgDbyCd_5RY_AZD0BM8tQEg",
//   authDomain: "course-manager-908b2.firebaseapp.com",
//   projectId: "course-manager-908b2",
//   storageBucket: "course-manager-908b2.firebasestorage.app",
//   messagingSenderId: "596803051121",
//   appId: "1:596803051121:web:a2424ff5dd23e7b4ab85d0",
//   measurementId: "G-QV6DW84WJC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // npm install -g firebase-tools

// firebase.ts
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_kE7gXa4ysoZT5BpGeS5bJwkFl1KTgCc",
  databaseURL: "https://video-sharing-35ce0-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();

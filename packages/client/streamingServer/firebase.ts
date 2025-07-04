import firebase from "firebase/compat/app";
import "firebase/compat/database";

// Firebase config
const firebaseConfig = {
    apiKey: process.env.REACT_APP_LIVE_STREAMING_KEY,
    databaseURL:
        "https://live-video-streaming-b0312-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase if not already
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// export const db = firebase;
export const db = firebase.database();
export const ServerValue = firebase.database.ServerValue;

// let firepadRef = firebase.database().ref();

// const urlparams = new URLSearchParams(window.location.search);
// const roomId = urlparams.get("id");

// if (window.location.href.includes("live-stream")) {
//     if (roomId) {
//         firepadRef = firepadRef.child(roomId);
//     } else {
//         firepadRef = firepadRef.push();
//         window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);

//         window.onbeforeunload = (e: any) => {
//             e.preventDefault();
//             e.returnValue = "";
//             firepadRef.remove().then(() => {
//                 console.log("All data removed successfully.");
//             });
//         };
//     }
// }

// export default firepadRef;

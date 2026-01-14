// ./streamingServer/firebase.ts
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
export const ServerValue = firebase.database.ServerValue;

/**
 * ✅ Create Firepad ref, running in client
 */
export const getFirepadRef = () => {
	if (typeof window === "undefined") {
		// Running SSR => return null
		return null;
	}

	let firepadRef = firebase.database().ref();

	// GET ?id in URL
	const urlParams = new URLSearchParams(window.location.search);
	const roomId = urlParams.get("id");

	if (window.location.href.includes("live-stream")) {
		if (roomId) {
			firepadRef = firepadRef.child(roomId);
		} else {
			firepadRef = firepadRef.push();
			window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);

			window.onbeforeunload = (e: any) => {
				e.preventDefault();
				e.returnValue = "";
				firepadRef.remove().then(() => {
					console.log("All data removed successfully.");
				});
			};
		}
	}

	return firepadRef;
};
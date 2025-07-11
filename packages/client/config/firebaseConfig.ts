import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_APP_ID!,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const storage = getStorage(app);

// export { app, storage };
export default storage;
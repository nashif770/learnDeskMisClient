// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD20lmuA587N8SuFSnwXyXGaXSpL3Jw10o",
  authDomain: "misauthsystem.firebaseapp.com",
  projectId: "misauthsystem",
  storageBucket: "misauthsystem.firebasestorage.app",
  messagingSenderId: "447516184714",
  appId: "1:447516184714:web:9b38e586020af909301d73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

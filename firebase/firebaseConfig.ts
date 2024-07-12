import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const API_KEY = import.meta.env.VITE_GOOGLE_AUTH_API_KEY;
console.log("key", API_KEY);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY || "aljaldsjop3lkl31-42elkadfl",
  authDomain: "getmetherapy-966a6.firebaseapp.com",
  projectId: "getmetherapy-966a6",
  storageBucket: "getmetherapy-966a6.appspot.com",
  messagingSenderId: "866445424025",
  appId: "1:866445424025:web:2628fb28af64fb6f790f08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signinWithGoogleHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const { displayName, email, photoURL } = result.user;
      const token = await result.user.getIdToken();

      localStorage.setItem("token", token);

      localStorage.setItem(
        "userdata",
        JSON.stringify({ name: displayName, email, profilePic: photoURL })
      );
    })
    .catch((error) => console.error(error));
};

export default app;

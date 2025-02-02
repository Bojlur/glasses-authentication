import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDZnHVLwP680tvf-mJEdBws-f9APqzKa6c",
  authDomain: "glasses-authentication-2dc43.firebaseapp.com",
  projectId: "glasses-authentication-2dc43",
  storageBucket: "glasses-authentication-2dc43.firebasestorage.app",
  messagingSenderId: "1004176768018",
  appId: "1:1004176768018:web:f738ea47f453263bbb2ccb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;
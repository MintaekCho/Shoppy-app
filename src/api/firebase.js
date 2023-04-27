import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PRIJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      console.log(token)
      return user; 
    })
    .catch(console.error);
}

export async function logout() {
  return signOut(auth)
    .then(() => null)
    .catch(console.error);
}

//파이어베이스에서 유저가 로그인 되어있는 상태인지 세션상태를 관찰하여 알려주는 로직
export function onUserStateChange(callback) {
    onAuthStateChanged(auth, (user) => {
       callback(user);
      });
      
}
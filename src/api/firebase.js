import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { v4 as uuid } from "uuid";

import { getDatabase, ref, child, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PRIJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase(app);

export async function login() {
  return signInWithPopup(auth, provider).catch(console.error);
}

export async function logout() {
  return signOut(auth).catch(console.error);
}

//파이어베이스에서 유저가 로그인 되어있는 상태인지 세션상태를 관찰하여 알려주는 로직
/**
 * 유저에 대한 정보는 컴포넌트에서 보관하고 있는데 새로고침하면 컴포넌트의 상태도 리셋되기 때문에
 * 유저가 로그인을 한 상태였는지 알 수가 없게 되버린다.
 */
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await adminUser(user) : null;
    console.log(updateUser);
    callback(updateUser);
  });
}

// 데이터베이스 api
async function adminUser(user) {
  return get(ref(db, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      console.log(admins);
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

export function addNewProduct(product, image) {
  const id = uuid();
  set(ref(db, `products/${id}`), {
    ...product,
    image,
    id,
    options: product.options.split(","),
  });
}

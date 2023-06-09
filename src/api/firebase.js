import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { v4 as uuid } from "uuid";

import { getDatabase, ref, get, set, remove, update } from "firebase/database";

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
export function onUserStateChange(setAuthState) {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await adminUser(user) : null;
    if(updateUser) setAuthState({
      user: updateUser,
      loading: false,
    }) 
    else setAuthState({
      user: null
    })
  });
}

// 데이터베이스 api
async function adminUser(user) {
  return get(ref(db, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

export async function addNewProduct(product, image) {
  const id = uuid();
  set(ref(db, `products/${id}`), {
    ...product,
    image,
    id,
    options: product.options.split(","),
  });
}

export async function addNewCart(product, userId) {
  set(ref(db, `cart/${userId}/${product.id}`), product);
}

export async function getCartProduct(userId) {
  return get(ref(db, `cart/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return null;
  });
}

export async function updateCartProduct(userId, product) {
  update(ref(db, `cart/${userId}/${product.id}`), product);
}

export async function removeCart(userId, productId) {
  return remove(ref(db, `cart/${userId}/${productId}`));
}

export async function getProducts() {
  return get(ref(db, `products`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return null;
  });
}

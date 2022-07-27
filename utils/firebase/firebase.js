import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from 'firebase/auth';

// import {getFireStore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAZkNS1_dk4yMPeo6j5Ff1imeEq_OaThCs",
    authDomain: "newstak-test.firebaseapp.com",
    databaseURL: "https://newstak-test.firebaseio.com",
    projectId: "newstak-test",
    storageBucket: "newstak-test.appspot.com",
    messagingSenderId: "715718150154",
    appId: "1:715718150154:web:4d5e043f4d529fe8a177f3"
};

const provider = new GoogleAuthProvider();

export const app = initializeApp(firebaseConfig);
// export const database = getFireStore(app);

export const auth = getAuth(app);

export const currentUser = auth.currentUser;

export const signInWithGoogle = async () => {
    const response = await signInWithPopup(auth,provider);
    return response;
};

export const signOutTak = () => {
    signOut(auth);
}

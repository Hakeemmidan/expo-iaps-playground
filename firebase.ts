import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig: object = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'buy-grapes-expo-demo.firebaseapp.com',
  databaseURL: 'https://buy-grapes-expo-demo-default-rtdb.firebaseio.com',
  projectId: 'buy-grapes-expo-demo',
  storageBucket: 'buy-grapes-expo-demo.appspot.com',
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// auth object
export const auth = firebase.auth();

// -- Helpers START --- //
// Google OAuth
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleAuthProvider);
// -- Helpers END --- //

export default firebase;
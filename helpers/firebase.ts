import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseConfig: object = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'buy-grapes-expo-demo.firebaseapp.com',
  databaseURL: 'https://buy-grapes-expo-demo-default-rtdb.firebaseio.com',
  projectId: 'buy-grapes-expo-demo',
  storageBucket: 'buy-grapes-expo-demo.appspot.com',
};

// initialize firebase
export const firebaseApp = initializeApp(firebaseConfig);

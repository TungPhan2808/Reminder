// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCgNQ7c0tD-RjnQmj_U3IAJ67SC2lOdp1I',
  authDomain: 'reminder-389903.firebaseapp.com',
  projectId: 'reminder-389903',
  storageBucket: 'reminder-389903.appspot.com',
  messagingSenderId: '960627034055',
  appId: '1:960627034055:web:2b18d343579187fff8bbe2',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInGoogle = () => {
  return signInWithPopup(auth, provider)
}

export const signOutGoogle = () => {
  return signOut(auth)
}

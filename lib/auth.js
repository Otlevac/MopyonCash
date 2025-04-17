// auth.js
// lib/auth.js
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

export const signUp = async (email, password, additionalData = {}) => {
  try {
    // Create the user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get Firestore separately
    const db = getFirestore();

    // Create the user document
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      ...additionalData,
      createdAt: new Date().toISOString()
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

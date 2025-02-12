import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase";

export const signUpWithEmail = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Set display name
    await updateProfile(user, { displayName: username });

    // Store user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      createdAt: new Date(),
    });

    console.log("User signed up:", user);
  } catch (error) {
    console.error("Sign-up error:", error.message);
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("User signed in:", user);
  } catch (error) {
    console.error("Sign-in error:", error.message);
  }
};

export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    //save data in user collection as well
    await setDoc(doc(db, "users", user.uid), {
      username: user.displayName,
      email: user.email,
      createdAt: new Date(),
    });
    console.log("User signed in:", user);
  } catch (error) {
    console.error("Sign-in error:", error.message);
  }
};

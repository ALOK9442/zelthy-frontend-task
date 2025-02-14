import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase";

export const signUpWithEmail = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // console.log("user",user);
    console.log("usercredtial", userCredential);
    // Set display name
    await updateProfile(user, { displayName: username });
    console.log("awit", await updateProfile(user, { displayName: username }));
    // Store user info in Firestore
    const userData = {
      username,
      email,
      createdAt: new Date(),
    };
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      createdAt: new Date(),
    });

    console.log("User signed up:", user);
    return userData;
  } catch (error) {
    console.error("Sign-up error:", error.message);
    throw error;
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
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log("User Data:", userSnap.data());
      return userSnap.data();
    } else {
      console.log("No user data found!");
      return null;
    }
    navi;
  } catch (error) {
    console.error("Sign-in error:", error.message);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    // console.log("User signed in:", user);
    console.log("usercredetinal", userCredential);
    if (userSnap.exists()) {
      console.log("User already exist Data:", userSnap.data());
      return userSnap.data();
    } else {
      console.log("No user data found!");
      const newUser = {
        username: user.displayName,
        email: user.email,
        createdAt: new Date(),
      };
      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        email: user.email,
        createdAt: new Date(),
      });
      return newUser;
    }

    // console.log("User signed in:", user);
  } catch (error) {
    console.error("Sign-in error:", error.message);
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    await auth.signOut();
    console.log("User signed out!");
  } catch (error) {
    console.error("Sign-out error:", error.message);
    throw error;
  }
};

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase";
import { handleAlert } from "../utils/handlealert";

export const signUpWithEmail = async (email, password, username) => {
  try {
    const usersRef = doc(db, "users", email);
    const userSnap = await getDoc(usersRef);

    if (userSnap.exists()) {
      console.log("User already existslaaaa");
      handleAlert("User already exists", "error");
      return null;
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("usercredtial", userCredential);
    await updateProfile(user, { displayName: username });
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
      return userSnap.data();
    } else {
      return null;
    }
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
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
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

  } catch (error) {
    console.error("Sign-in error:", error.message);
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Sign-out error:", error.message);
    throw error;
  }
};


export const editProfile = async (newUsername) => {
  try {
    const user = auth.currentUser;
    await updateProfile(user, { displayName: newUsername });
    return user;
  } catch (error) {
    console.error("Update error:", error.message);
    throw error;
  }
};

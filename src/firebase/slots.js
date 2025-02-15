import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const addUnavailableSlot = async (userId, startTime, endTime) => {
  try {
    const docRef = await addDoc(collection(db, "users", userId, "unavailableSlots"), {
      startTime: startTime,
      endTime: endTime,
    });
    return { id: docRef.id, startTime, endTime };
  } catch (error) {
    console.error("Error marking unavailable slot:", error);
    return null;
  }
};

export const getUnavailableSlots = async (userId) => {
  try {
    const slotsRef = collection(db, "users", userId, "unavailableSlots");
    console.log("slotsRef",slotsRef);
    const snapshot = await getDocs(slotsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching unavailable slots:", error);
    return [];
  }
};

export const updateUnavailableSlot = async (userId, slotId, newStartTime, newEndTime) => {
  try {
    const slotRef = doc(db, "users", userId, "unavailableSlots", slotId);
    await updateDoc(slotRef, {
      startTime: newStartTime,
      endTime: newEndTime,
    });
    return { id: slotId, startTime: newStartTime, endTime: newEndTime };
  } catch (error) {
    console.error("Error updating unavailable slot:", error);
    return null;
  }
};

export const deleteUnavailableSlot = async (userId, slotId) => {
  try {
    const slotRef = doc(db, "users", userId, "unavailableSlots", slotId);
    await deleteDoc(slotRef);
  } catch (error) {
    console.error("Error deleting unavailable slot:", error);
  }
};

export const copyUnavailableSlot = async (userId, slotId) => {
  try {
    const slotRef = doc(db, "users", userId, "unavailableSlots", slotId);
    const slotSnap = await getDoc(slotRef);

    if (slotSnap.exists()) {
      const slotData = slotSnap.data();
      const newStartTime = new Date(slotData.startTime.seconds * 1000);
      const newEndTime = new Date(slotData.endTime.seconds * 1000);

      newStartTime.setDate(newStartTime.getDate() + 1);
      newEndTime.setDate(newEndTime.getDate() + 1);

      return await addUnavailableSlot(userId, newStartTime, newEndTime);
    }
  } catch (error) {
    console.error("Error copying unavailable slot:", error);
  }
};

export const searchUserByEmail = async (email) => {
  try {
    console.log("emaily",email);
    const usersRef = collection(db, "users");
    console.log("emailyuserref",usersRef);
    const q = query(usersRef, where("email", "==", email));
    console.log("emailyq",q);
    const snapshot = await getDocs(q);

    
    if (snapshot.empty) return null;
    const userDoc = snapshot.docs[0];
    const userid = userDoc.id;

    const slotsRef = collection(db, "users", userid, "unavailableSlots");
    const slotsSnapshot = await getDocs(slotsRef);

    const unavailableSlots = slotsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("emailyunavailableSlots",unavailableSlots);
    return unavailableSlots;
  } catch (error) {
    console.error("Error searching user:", error);
    return null;
  }
};

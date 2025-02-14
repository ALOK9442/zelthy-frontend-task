import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const markUnavailableSlot = async (userId, startTime, endTime) => {
  try {
    await addDoc(collection(db, "users", userId, "unavailableSlots"), {
      startTime: startTime,
      endTime: endTime,
    });
    console.log("Slot marked as unavailable!");
  } catch (error) {
    console.error("Error marking unavailable slot:", error);
  }
};

export const getUnavailableSlots = async (userId) => {
  try {
    const slotsRef = collection(db, "users", userId, "unavailableSlots");
    const snapshot = await getDocs(slotsRef);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching unavailable slots:", error);
    return [];
  }
};

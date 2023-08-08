import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const usersRef = collection(db, "teachers");

const getTeacher = async (userEmail) => {
  try {
    const teacherSnapshot = await getDocs(
      query(usersRef, where("email", "==", userEmail))
    );

    if (!teacherSnapshot.empty) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false, message: "Error to get the teacher", error };
  }
};

export { getTeacher };

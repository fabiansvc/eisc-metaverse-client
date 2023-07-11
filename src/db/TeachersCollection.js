import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const usersRef = collection(db, "teachers");

const getTeacher = async (userEmail) => {
  const docSnapshot = await getDocs(query(usersRef, where("email", "==", userEmail)));
  return docSnapshot;
};

export { getTeacher };
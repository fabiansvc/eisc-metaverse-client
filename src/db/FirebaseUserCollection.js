import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const usersRef = collection(db, "users");

const createUser = async (userData) => {
  const docRef = await addDoc(usersRef, userData);
  return docRef;
};

const getUser = async (userEmail) => {
  const docSnapshot = await getDocs(query(usersRef, where("email", "==", userEmail)));
  return docSnapshot;
};

export { createUser, getUser };

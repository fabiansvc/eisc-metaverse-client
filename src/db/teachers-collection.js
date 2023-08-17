'use strict'

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const usersRef = collection(db, "teachers");

const getTeacher = async (email) => {
  try {
    const result = await getDocs(query(usersRef, where("email", "==", email)));

    if (result.empty) return { sucess: "user" };
    else return { sucess: "teacher" };
  } catch (error) {
    console.log("Error to get the teacher", error);
  }
};

export { getTeacher };

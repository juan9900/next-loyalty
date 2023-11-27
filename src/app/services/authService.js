import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config.js";

export const authenticate = (email, password) => {
  try {
    const logIn = signInWithEmailAndPassword(auth, email, password);
    return logIn;
  } catch (e) {
    console.log(e.message);
  }
};

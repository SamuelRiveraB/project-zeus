import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { toastErr } from "../utils/toast";
import CatchErr from "../utils/catchErr";
import { authDataType, setLoadingType } from "../Types";
import { NavigateFunction } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const usersColl = "users";
const tasksColl = "tasks";
const taskListColl = "taskList";
const chatsColl = "chats";
const messagesColl = "messages";

const addUserToCollection = async (
  uid: string,
  email: string,
  username: string,
  img: string
) => {
  await setDoc(doc(db, usersColl, uid), {
    isOnline: true,
    img,
    username,
    email,
    creationTime: serverTimestamp(),
    lastSeen: serverTimestamp(),
    bio: `Hello, I'm ${username}`,
  });
};

export const BE_signUp = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void,
  goTo: NavigateFunction
) => {
  const { email, password, confirmPW } = data;
  setLoading(true);
  if (email && password && confirmPW) {
    if (password === confirmPW) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          addUserToCollection(
            user.uid,
            user.email || "",
            user.email?.split("@")[0] || "",
            "imgLink"
          );
          setLoading(false);
          reset();
          goTo("/dashboard");
        })
        .catch((err) => {
          CatchErr(err);
          setLoading(false);
        });
    } else {
      toastErr("Passwords must match");
      setLoading(false);
    }
  } else {
    toastErr("Fields shouldn't be left empty!");
    setLoading(false);
  }
};

export const BE_signIn = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void,
  goTo: NavigateFunction
) => {
  const { email, password } = data;
  setLoading(true);
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      //   console.log(user);
      setLoading(false);
      reset();
      goTo("/dashboard");
    })
    .catch((err) => {
      CatchErr(err);
      setLoading(false);
    });
};

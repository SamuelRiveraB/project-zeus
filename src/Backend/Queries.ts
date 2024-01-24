import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { toastErr } from "../utils/toast";
import CatchErr from "../utils/catchErr";
import { authDataType, setLoadingType, userType } from "../Types";
import { NavigateFunction } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { defaultUser, setUser } from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";

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
  return getUserInfo(uid);
};

const getUserInfo = async (uid: string): Promise<userType> => {
  const userRef = doc(db, usersColl, uid);
  const user = await getDoc(userRef);
  if (user.exists()) {
    const { isOnline, img, username, email, creationTime, lastSeen, bio } =
      user.data();
    return {
      id: user.id,
      isOnline,
      img,
      username,
      email,
      creationTime,
      lastSeen,
      bio,
    };
  } else {
    toastErr("getUserInfo: User not found");
    return defaultUser;
  }
};

export const BE_signUp = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void,
  goTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password, confirmPW } = data;
  setLoading(true);
  if (email && password && confirmPW) {
    if (password === confirmPW) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          const userInfo = await addUserToCollection(
            user.uid,
            user.email || "",
            user.email?.split("@")[0] || "",
            "imgLink"
          );
          dispatch(setUser(userInfo));
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
  goTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password } = data;
  setLoading(true);
  signInWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      const userInfo = await getUserInfo(user.uid);
      dispatch(setUser(userInfo));
      setLoading(false);
      reset();
      goTo("/dashboard");
    })
    .catch((err) => {
      CatchErr(err);
      setLoading(false);
    });
};

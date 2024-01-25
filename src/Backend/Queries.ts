import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { toastErr } from "../utils/toast";
import CatchErr from "../utils/catchErr";
import { authDataType, setLoadingType, userType } from "../Types";
import { NavigateFunction } from "react-router-dom";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { defaultUser, setUser, userStorageName } from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";
import avatarGenerator from "../utils/avatarGenerator";
import convertTime from "../utils/convertTime";

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
      creationTime: creationTime
        ? convertTime(creationTime.toDate())
        : "no date yet: userinfo",
      lastSeen: lastSeen
        ? convertTime(lastSeen.toDate())
        : "no date yet: userinfo",
      bio,
    };
  } else {
    toastErr("getUserInfo: User not found");
    return defaultUser;
  }
};

const updateUserInfo = async ({
  id,
  username,
  img,
  isOnline,
  isOffline,
}: {
  id?: string;
  username?: string;
  img?: string;
  isOnline?: boolean;
  isOffline?: boolean;
}) => {
  if (!id) {
    id = getStorageUser().id;
  }
  if (id) {
    await updateDoc(doc(db, usersColl, id), {
      ...(username && { username }),
      ...(img && { img }),
      ...(isOnline && { isOnline }),
      ...(isOffline && { isOnline: false }),
      lastSeen: serverTimestamp(),
    });
  }
};

export const getStorageUser = () => {
  const usr = localStorage.getItem(userStorageName);
  if (usr) return JSON.parse(usr);
  else return null;
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
          const imgLink = avatarGenerator(user.email?.split("@")[0]);
          const userInfo = await addUserToCollection(
            user.uid,
            user.email || "",
            user.email?.split("@")[0] || "",
            imgLink
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
      toastErr("Passwords must match", setLoading);
    }
  } else {
    toastErr("Fields shouldn't be left empty!", setLoading);
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
      await updateUserInfo({ id: user.uid, isOnline: true });
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

export const BE_signOut = (
  dispatch: AppDispatch,
  goTo: NavigateFunction,
  setLoading: setLoadingType
) => {
  setLoading(true);
  signOut(auth)
    .then(async () => {
      goTo("/auth");
      await updateUserInfo({ isOffline: true });
      dispatch(setUser(defaultUser));
      localStorage.removeItem(userStorageName);
      setLoading(false);
    })
    .catch((err) => CatchErr(err));
};

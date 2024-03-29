import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { toastErr, toastSucc } from "../utils/toast";
import CatchErr from "../utils/catchErr";
import {
  authDataType,
  chatType,
  messageType,
  setLoadingType,
  taskListType,
  taskType,
  userType,
} from "../Types";
import { NavigateFunction } from "react-router-dom";
import {
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  defaultUser,
  setAlertProps,
  setUser,
  setUsers,
  userStorageName,
} from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";
import avatarGenerator from "../utils/avatarGenerator";
import convertTime from "../utils/convertTime";
import {
  addTaskList,
  defaultTaskList,
  setTaskList,
  saveTaskListTitle,
  deleteTaskList,
  defaultTask,
  addTask,
  saveTask,
  setTasks,
  deleteTask,
} from "../Redux/taskListSlice";
import { getSourceMapRange } from "typescript";
import { setChats, setCurrentMsgs } from "../Redux/chatsSlice";

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

export const getUserInfo = async (
  uid: string,
  setLoading?: setLoadingType
): Promise<userType> => {
  if (setLoading) setLoading(true);
  const userRef = doc(db, usersColl, uid);
  const user = await getDoc(userRef);
  if (user.exists()) {
    const { isOnline, img, username, email, creationTime, lastSeen, bio } =
      user.data();

    if (setLoading) setLoading(false);

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
    if (setLoading) setLoading(false);
    toastErr("getUserInfo: User not found");
    return defaultUser;
  }
};

export const BE_saveProfile = async (
  dispatch: AppDispatch,
  data: { email: string; username: string; password: string; img: string },
  setLoading: setLoadingType
) => {
  setLoading(true);

  const { email, username, password, img } = data;
  const id = getStorageUser().id;
  if (id && auth.currentUser) {
    if (email) {
      updateEmail(auth.currentUser, email)
        .then(() => {
          toastSucc("Email updated successfully");
        })
        .catch((err) => CatchErr(err));
    }

    if (password) {
      updatePassword(auth.currentUser, password)
        .then(() => {
          toastSucc("Password updated successfully");
        })
        .catch((err) => CatchErr(err));
    }

    if (username || img) {
      await updateUserInfo({ username, img });
      toastSucc("Profile updated successfully");
    }
    const userInfo = await getUserInfo(id);
    dispatch(setUser(userInfo));
    setLoading(false);
  } else toastErr("BE_saveProfile: id not found");
};

export const BE_deleteAccount = async (
  dispatch: AppDispatch,
  goTo: NavigateFunction,
  setLoading: setLoadingType
) => {
  setLoading(true);
  const userTaskList = await getAllTaskList();
  if (userTaskList && userTaskList.length > 0) {
    userTaskList.forEach((t) => {
      if (t.id && t.tasks) BE_deleteTaskList(t.id, t.tasks, dispatch);
    });
  }

  await deleteDoc(doc(db, usersColl, getStorageUser().id));
  const user = auth.currentUser;
  if (user) {
    deleteUser(user)
      .then(async () => {
        BE_signOut(dispatch, goTo, setLoading, true);
        setLoading(false);
      })
      .catch((err) => CatchErr(err));
  }
};

export const BE_getAllUsers = async (
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  setLoading(true);
  const q = query(collection(db, usersColl), orderBy("isOnline", "desc"));
  onSnapshot(q, (usersSnapshot) => {
    let users: userType[] = [];
    usersSnapshot.forEach((user) => {
      const { img, isOnline, username, email, bio, creationTime, lastSeen } =
        user.data();
      users.push({
        id: user.id,
        img,
        isOnline,
        username,
        email,
        bio,
        creationTime: creationTime
          ? convertTime(creationTime.toDate())
          : "no date yet",
        lastSeen: lastSeen ? convertTime(lastSeen.toDate()) : "no date yet",
      });
    });
    const id = getStorageUser().id;
    if (id) {
      dispatch(setUsers(users.filter((u) => u.id !== id)));
    }
    setLoading(false);
  });
};

export const getStorageUser = () => {
  const usr = localStorage.getItem(userStorageName);
  if (usr) return JSON.parse(usr);
  else return "";
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
  setLoading: setLoadingType,
  deleteAcc?: boolean
) => {
  setLoading(true);
  signOut(auth)
    .then(async () => {
      if (!deleteAcc) await updateUserInfo({ isOffline: true });
      dispatch(setUser(defaultUser));
      localStorage.removeItem(userStorageName);
      goTo("/auth");
      setLoading(false);
    })
    .catch((err) => CatchErr(err));
};

// Task list

export const BE_addTaskList = async (
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  setLoading(true);
  const { title } = defaultTaskList;
  const list = await addDoc(collection(db, taskListColl), {
    title,
    userId: getStorageUser().id,
  });
  const docSnap = await getDoc(doc(db, list.path));
  if (docSnap.exists()) {
    const newDoc: taskListType = {
      id: docSnap.id,
      title: docSnap.data().title,
    };
    dispatch(addTaskList(newDoc));
    setLoading(false);
  } else {
    toastErr("BE_addTaskList: No such doc");
    setLoading(false);
  }
};

export const BE_getTaskList = async (
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  setLoading(true);
  const taskList = await getAllTaskList();
  dispatch(setTaskList(taskList));
  setLoading(false);
};

export const BE_saveTaskList = async (
  dispatch: AppDispatch,
  setLoading: setLoadingType,
  listId: string,
  title: string
) => {
  setLoading(true);
  await updateDoc(doc(db, taskListColl, listId), { title });
  const updatedTaskList = await getDoc(doc(db, taskListColl, listId));
  setLoading(false);
  dispatch(
    saveTaskListTitle({ id: updatedTaskList.id, ...updatedTaskList.data() })
  );
};

export const BE_deleteTaskList = async (
  listId: string,
  tasks: taskType[],
  dispatch: AppDispatch,
  setLoading?: setLoadingType
) => {
  if (setLoading) setLoading(true);
  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      const { id } = tasks[i];
      if (id) BE_deleteTask(listId, id, dispatch);
    }
  }
  const listRef = doc(db, taskListColl, listId);
  await deleteDoc(listRef);
  const deletedList = await getDoc(listRef);
  if (!deletedList.exists()) {
    if (setLoading) setLoading(false);
    dispatch(deleteTaskList(listId));
  }
};

const getAllTaskList = async () => {
  const id = getStorageUser().id;

  if (id) {
    const q = query(
      collection(db, taskListColl),
      where("userId", "==", getStorageUser().id)
    );
    const taskListSnapshot = await getDocs(q);
    const taskList: taskListType[] = [];
    taskListSnapshot.forEach((doc) => {
      const { title } = doc.data();
      taskList.push({
        id: doc.id,
        title,
        editMode: false,
        tasks: [],
      });
    });
    return taskList;
  } else toastErr("TaskList err");
};

// Tasks

export const BE_deleteTask = async (
  listId: string,
  id: string,
  dispatch: AppDispatch,
  setLoading?: setLoadingType
) => {
  if (setLoading) setLoading(true);
  const taskRef = doc(db, taskListColl, listId, tasksColl, id);
  await deleteDoc(taskRef);
  const deletedTask = await getDoc(taskRef);
  if (!deletedTask.exists()) {
    if (setLoading) setLoading(false);
    dispatch(deleteTask({ listId, id }));
  }
};

export const BE_addTask = async (
  listId: string,
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  setLoading(true);
  const task = await addDoc(collection(db, taskListColl, listId, tasksColl), {
    ...defaultTask,
  });

  const newTaskSnap = await getDoc(doc(db, task.path));
  if (newTaskSnap.exists()) {
    const { title, description } = newTaskSnap.data();
    const newTask: taskType = {
      id: newTaskSnap.id,
      title,
      description,
    };
    dispatch(addTask({ listId, newTask }));
    setLoading(false);
  } else {
    toastErr("BE_addTask: No such document");
    setLoading(false);
  }
};

export const BE_saveTask = async (
  listId: string,
  dispatch: AppDispatch,
  setLoading: setLoadingType,
  data: taskType
) => {
  setLoading(true);
  const { id } = data;
  if (id) {
    const taskRef = doc(db, taskListColl, listId, tasksColl, id);
    await updateDoc(taskRef, data);
    const updatedTask = await getDoc(taskRef);
    if (updatedTask.exists()) {
      setLoading(false);
      dispatch(saveTask({ listId, ...updatedTask.data() }));
    } else toastErr("BE_saveTask: updated task not found");
  } else toastErr("BE_saveTask: id not found");
};

export const getAllTasks = async (
  listId: string,
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  setLoading(true);
  const taskRef = collection(db, taskListColl, listId, tasksColl);
  const tasksSnap = await getDocs(taskRef);
  const tasks: taskType[] = [];
  if (!tasksSnap.empty) {
    tasksSnap.forEach((task) => {
      const { title, description } = task.data();
      tasks.push({
        id: task.id,
        title,
        description,
        editMode: false,
        collapsed: true,
      });
    });
  }
  dispatch(setTasks({ listId, tasks }));
  setLoading(false);
};

// Chat

export const BE_startChat = async (
  rId: string,
  rName: string,
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  const sId = getStorageUser().id;
  setLoading(true);
  const q = query(
    collection(db, chatsColl),
    or(
      and(where("senderId", "==", sId), where("receiverId", "==", rId)),
      and(where("senderId", "==", rId), where("receiverId", "==", sId))
    )
  );
  const res = await getDocs(q);

  if (res.empty) {
    const newChat = await addDoc(collection(db, chatsColl), {
      senderId: sId,
      receiverId: rId,
      lastMsg: "",
      updatedAt: serverTimestamp(),
      senderToReceiverNewMsgCount: 0,
      receiverToSenderNewMsgCount: 0,
    });
    const newChatSnap = await getDoc(doc(db, newChat.path));
    if (!newChatSnap.exists()) {
      toastErr("BE_startChat: No such document");
    }
    setLoading(false);
    dispatch(setAlertProps({ open: false }));
  } else {
    toastErr(`You already started chatting with ${rName}`);
    setLoading(false);
    dispatch(setAlertProps({ open: false }));
  }
};

export const BE_getChats = async (dispatch: AppDispatch) => {
  const id = getStorageUser().id;
  const q = query(
    collection(db, chatsColl),
    or(where("senderId", "==", id), where("receiverId", "==", id)),
    orderBy("updatedAt", "desc")
  );
  onSnapshot(q, (chatsSnapshot) => {
    const chats: chatType[] = [];
    chatsSnapshot.forEach((chat) => {
      const {
        senderId,
        receiverId,
        lastMsg,
        updatedAt,
        receiverToSenderNewMsgCount,
        senderToReceiverNewMsgCount,
      } = chat.data();

      chats.push({
        id: chat.id,
        senderId,
        receiverId,
        lastMsg,
        updatedAt: updatedAt ? convertTime(updatedAt.toDate()) : "no date yet",
        receiverToSenderNewMsgCount,
        senderToReceiverNewMsgCount,
      });
    });
    dispatch(setChats(chats));
  });
};

export const BE_getMsgs = async (
  dispatch: AppDispatch,
  chatId: string,
  setLoading: setLoadingType
) => {
  setLoading(true);

  const q = query(
    collection(db, chatsColl, chatId, messagesColl),
    orderBy("createdAt", "asc")
  );
  onSnapshot(q, (messagesSnapshot) => {
    let msgs: messageType[] = [];
    messagesSnapshot.forEach((msg) => {
      const { senderId, content, createdAt } = msg.data();
      msgs.push({
        id: msg.id,
        senderId,
        content,
        createdAt: createdAt ? convertTime(createdAt.toDate()) : "No date yet",
      });
    });
    dispatch(setCurrentMsgs(msgs));
    setLoading(false);
  });
};

export const BE_sendMsgs = async (
  chatId: string,
  data: messageType,
  setLoading: setLoadingType
) => {
  setLoading(true);
  const res = await addDoc(collection(db, chatsColl, chatId, messagesColl), {
    ...data,
    createdAt: serverTimestamp(),
  });
  const newMsg = await getDoc(doc(db, res.path));
  if (newMsg.exists()) {
    setLoading(false);
    await updateNewMsgCount(chatId, true);
    await updateLastMsg(chatId, newMsg.data().content);
    await updateUserInfo({});
  }
};

export const iCreatedChat = (senderId: string) => {
  const myId = getStorageUser().id;
  return myId === senderId;
};

export const updateNewMsgCount = async (chatId: string, reset?: boolean) => {
  const chat = await getDoc(doc(db, chatsColl, chatId));
  let senderToReceiverNewMsgCount = chat.data()?.senderToReceiverNewMsgCount;
  let receiverToSenderNewMsgCount = chat.data()?.receiverToSenderNewMsgCount;

  if (iCreatedChat(chat.data()?.senderId)) {
    if (reset) receiverToSenderNewMsgCount = 0;
    else senderToReceiverNewMsgCount++;
  } else {
    if (reset) senderToReceiverNewMsgCount = 0;
    else receiverToSenderNewMsgCount++;
  }
  await updateDoc(doc(db, chatsColl, chatId), {
    updatedAt: serverTimestamp(),
    senderToReceiverNewMsgCount,
    receiverToSenderNewMsgCount,
  });
};

const updateLastMsg = async (chatId: string, lastMsg: string) => {
  await updateNewMsgCount(chatId);
  await updateDoc(doc(db, chatsColl, chatId), {
    lastMsg,
    updatedAt: serverTimestamp(),
  });
};

import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../Types";

export const userStorageName = "zeus_user";

export const defaultUser: userType = {
  id: "",
  username: "",
  email: "",
  creationTime: "",
  img: "",
  isOnline: false,
  lastSeen: "",
  bio: "",
};

type userStateType = {
  users: userType[];
  currentUser: userType;
  alertProps: {
    open: boolean;
    receiverId: string;
    receiverName: string;
  };
};

const initialState: userStateType = {
  users: [],
  currentUser: defaultUser,
  alertProps: {
    open: false,
    receiverId: "",
    receiverName: "",
  },
  // currentSelectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      localStorage.setItem(userStorageName, JSON.stringify(user));
      state.currentUser = user;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setAlertProps: (state, action) => {
      const { open, receiverId, receiverName } = action.payload;
      state.alertProps = {
        open,
        receiverId: receiverId || "",
        receiverName: receiverName || "",
      };
    },
  },
});

export const { setUser, setUsers, setAlertProps } = userSlice.actions;
export default userSlice.reducer;

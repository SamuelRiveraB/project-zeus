import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../Types";

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

const initialState = {
  // user: [],
  currentUser: defaultUser,
  // currentSelectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      localStorage.setItem("zeus_user", JSON.stringify(user));
      state.currentUser = user;
    },
    setUsers: (state, action) => {},
  },
});

export const { setUser, setUsers } = userSlice.actions;
export default userSlice.reducer;

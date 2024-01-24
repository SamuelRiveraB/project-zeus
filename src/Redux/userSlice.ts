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

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    setUsers: (state, action) => {},
  },
});

export const { setUser, setUsers } = userSlice.actions;
export default userSlice.reducer;

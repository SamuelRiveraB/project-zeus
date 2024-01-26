import { createSlice } from "@reduxjs/toolkit";
import { chatType, userType } from "../Types";
import { defaultUser } from "./userSlice";

type chatStateType = {
  chats: chatType[];
  isChatsTab: boolean;
  currentSelectedChat: userType;
  sidebarOpen: boolean;
};

const initialState: chatStateType = {
  isChatsTab: false,
  chats: [],
  currentSelectedChat: defaultUser,
  sidebarOpen: true,
};

const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsChatsTab: (state, action) => {
      state.isChatsTab = action.payload;
    },
    setChats: (state, action) => {
      const chats = action.payload;
      state.chats = chats;
    },
    setCurrentSelectedChat: (state, action) => {
      state.currentSelectedChat = action.payload;
    },
    setSidebarOpen: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const {
  setIsChatsTab,
  setChats,
  setCurrentSelectedChat,
  setSidebarOpen,
} = chatsSlice.actions;
export default chatsSlice.reducer;

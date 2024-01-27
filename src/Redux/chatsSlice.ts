import { createSlice } from "@reduxjs/toolkit";
import { chatType, messageType, userType } from "../Types";
import { defaultUser } from "./userSlice";

type chatStateType = {
  chats: chatType[];
  isChatsTab: boolean;
  currentSelectedChat: userType & {
    chatId?: string;
    senderToReceiverNewMsgCount?: number;
    receiverToSenderNewMsgCount?: number;
  };
  sidebarOpen: boolean;
  currentMsgs: messageType[];
};

const initialState: chatStateType = {
  isChatsTab: false,
  chats: [],
  currentSelectedChat: defaultUser,
  sidebarOpen: true,
  currentMsgs: [],
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
    setCurrentMsgs: (state, action) => {
      state.currentMsgs = action.payload;
    },
  },
});

export const {
  setIsChatsTab,
  setChats,
  setCurrentSelectedChat,
  setSidebarOpen,
  setCurrentMsgs,
} = chatsSlice.actions;
export default chatsSlice.reducer;

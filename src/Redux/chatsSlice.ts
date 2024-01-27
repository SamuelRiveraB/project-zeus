import { createSlice } from "@reduxjs/toolkit";
import { chatType, messageType, userType } from "../Types";
import { defaultUser } from "./userSlice";
import { iCreatedChat } from "../Backend/Queries";
import { stat } from "fs";

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
  hasNewMsg: boolean;
};

const initialState: chatStateType = {
  isChatsTab: false,
  chats: [],
  currentSelectedChat: defaultUser,
  sidebarOpen: true,
  currentMsgs: [],
  hasNewMsg: false,
};

const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsChatsTab: (state, action) => {
      state.isChatsTab = action.payload;
    },
    setChats: (state, action: { payload: chatType[] }) => {
      const chats = action.payload;
      const newMsgCount = chats.reduce((acc, c) => {
        if (iCreatedChat(c.senderId)) {
          return acc + (c.receiverToSenderNewMsgCount || 0);
        } else {
          return acc + (c.senderToReceiverNewMsgCount || 0);
        }
      }, 0);
      state.hasNewMsg = newMsgCount > 0;
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

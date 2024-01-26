import { createSlice } from "@reduxjs/toolkit";
import { chatType } from "../Types";

type chatStateType = {
  chats: chatType[];
  isChatsTab: boolean;
};

const initialState: chatStateType = { isChatsTab: false, chats: [] };

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
  },
});

export const { setIsChatsTab, setChats } = chatsSlice.actions;
export default chatsSlice.reducer;

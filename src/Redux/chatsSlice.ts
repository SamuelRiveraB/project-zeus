import { createSlice } from "@reduxjs/toolkit";

const initialState = { isChatsTab: false, chats: [] };

const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsChatsTab: (state, action) => {
      state.isChatsTab = action.payload;
    },
  },
});

export const { setIsChatsTab } = chatsSlice.actions;
export default chatsSlice.reducer;

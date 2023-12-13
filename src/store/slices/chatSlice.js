import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    allUsers: null,
    userChats: null,
    activeChat: null,
    activeChatMessages: null,
  },
  reducers: {
    addAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    storeUserChats: (state, action) => {
      state.userChats = action.payload;
    },
    makeAsActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    storeActiveChatMessages: (state, action) => {
      state.activeChatMessages = action.payload;
    },
  },
});
export const {
  addAllUsers,
  storeUserChats,
  makeAsActiveChat,
  storeActiveChatMessages,
} = chatSlice.actions;
export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    allUsers: [],
    totalUsers: [],
    userChats: [],
    activeChat: null,
    activeChatMessages: [],
    newMessage: null,
    getMessage: null,
  },
  reducers: {
    addAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    addTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
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
    storeNewMessage: (state, action) => {
      state.newMessage = action.payload;
    },
    storeGetMessage: (state, action) => {
      state.getMessage = action.payload;
    },
  },
});
export const {
  addAllUsers,
  addTotalUsers,
  storeUserChats,
  makeAsActiveChat,
  storeActiveChatMessages,
  storeNewMessage,
  storeGetMessage,
} = chatSlice.actions;
export default chatSlice.reducer;

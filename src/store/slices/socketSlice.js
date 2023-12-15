import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socketServer: null,
    onlineUsers: [],
  },
  reducers: {
    addSocketServer: (state, action) => {
      state.socketServer = action.payload;
    },
    storeOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});
export const { addSocketServer, storeOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;

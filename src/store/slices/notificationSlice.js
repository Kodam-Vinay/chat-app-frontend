import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    allNotifications: [],
  },
  reducers: {
    addToNotifications: (state, action) => {
      state.allNotifications = action.payload;
    },
  },
});

export const { addToNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;

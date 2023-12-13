import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    isLogoutButtonClicked: false,
  },
  reducers: {
    handleLogoutButton: (state, action) => {
      state.isLogoutButtonClicked = action.payload;
    },
  },
});
export const { handleLogoutButton } = navbarSlice.actions;
export default navbarSlice.reducer;

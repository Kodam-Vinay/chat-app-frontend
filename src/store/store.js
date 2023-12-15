import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import userSlice from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import navbarSlice from "./slices/navbarSlice";
import chatSlice from "./slices/chatSlice";
import socketSlice from "./slices/socketSlice";

const persistConfig = {
  key: "user",
  storage,
};

const reducers = combineReducers({ user: userSlice });
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: {
    persistedReducer: persistedReducer,
    navbar: navbarSlice,
    chat: chatSlice,
    socket: socketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

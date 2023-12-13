import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import userSlice from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import navbarSlice from "./slices/navbarSlice";
import chatSlice from "./slices/chatSlice";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import selectedFriendReducer from "./selectedFriendSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    selectedFriend: selectedFriendReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

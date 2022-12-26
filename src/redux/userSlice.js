import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: "",
    email: "",
    uid: "",
    photoURL: "",
  },
  reducers: {
    login: (state, action) => {
      const { displayName, email, uid, photoURL } = action.payload;
      state.displayName = displayName;
      state.email = email;
      state.uid = uid;
      state.photoURL = photoURL;
    },
    logout: (state) => {
      state.displayName = "";
      state.email = "";
      state.uid = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

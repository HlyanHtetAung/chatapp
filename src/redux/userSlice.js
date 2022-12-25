import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: "",
    email: "",
    uid: "",
  },
  reducers: {
    login: (state, action) => {
      const { displayName, email, uid } = action.payload;
      state.displayName = displayName;
      state.email = email;
      state.uid = uid;
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

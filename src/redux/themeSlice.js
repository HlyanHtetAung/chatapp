import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "dark",
  },
  reducers: {
    changeDarkTheme: (state) => {
      state.theme = "dark";
    },
    changeLightTheme: (state) => {
      state.theme = "light";
    },
  },
});

export const { changeDarkTheme, changeLightTheme } = themeSlice.actions;

export default themeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const MESSAGES_INITIAL_STATE = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState: MESSAGES_INITIAL_STATE,
  reducers: {
    setAllMessages: (state, action) => {
      const { messages } = action.payload;
      state.messages = messages;
    },
  },
});

export const { setAllMessages } = messagesSlice.actions;

export default messagesSlice.reducer;

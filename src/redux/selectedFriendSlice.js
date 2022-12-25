import { createSlice } from "@reduxjs/toolkit";

const selectedFriendSlice = createSlice({
  name: "selectedFriend",
  initialState: {
    selectedUserFriend: {},
  },
  reducers: {
    setSelectedFriend: (state, action) => {
      const { selectedUser } = action.payload;
      state.selectedUserFriend = selectedUser;
    },
    unSetSelectedFirend: (state) => {
      state.selectedUserFriend = {};
    },
  },
});

export const { setSelectedFriend, unSetSelectedFirend } =
  selectedFriendSlice.actions;

export default selectedFriendSlice.reducer;

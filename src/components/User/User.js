import { doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { setSelectedFriend } from "../../redux/selectedFriendSlice";
import "./user.scss";

const User = ({ displayName, usr }) => {
  const { uid } = useSelector((state) => state.user);
  const { selectedUserFriend } = useSelector((state) => state.selectedFriend);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createChatDoc = async (chatId) => {
    await setDoc(doc(db, "chats", chatId), {
      messages: [],
    });
  };

  const selectUserHandle = async () => {
    const currentUserId = uid;
    const selectedFriendId = usr.uid;
    const chatId =
      currentUserId > selectedFriendId
        ? currentUserId + selectedFriendId
        : selectedFriendId + currentUserId;
    // check doc is exists or not
    const docSnap = await getDoc(doc(db, "chats", chatId));
    if (docSnap.exists()) {
      dispatch(setSelectedFriend({ selectedUser: usr }));
      navigate("/");
      return;
    }
    dispatch(setSelectedFriend({ selectedUser: usr }));
    createChatDoc(chatId);
    navigate("/");
  };

  return (
    <div className="user_container" onClick={selectUserHandle}>
      <img src={usr.photoURL} alt="" />
      <p>{displayName}</p>
    </div>
  );
};

export default User;

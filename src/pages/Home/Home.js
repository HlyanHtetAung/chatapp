import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsCameraVideo, BsEmojiLaughing } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { AiFillPicture } from "react-icons/ai";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import "./home.scss";

import MessagesContainer from "../../components/MessagesContainer/MessagesContainer";
import { db } from "../../firebase";
import { v4 } from "uuid";

const Home = () => {
  const { theme } = useSelector((state) => state.theme);
  const { selectedUserFriend } = useSelector((state) => state.selectedFriend);
  const [textMessageInput, setTextMessageInput] = useState("");
  const { uid } = useSelector((state) => state.user);

  const newMessage = {
    messageId: v4(),
    messageOwnerId: uid,
    letterMessage: textMessageInput,
    photoMessageURL:
      "https://pyxis.nymag.com/v1/imgs/a17/9f5/627bd5e8a3bf9817ee565cf99388d84c79-chatroom-silo.png",
    selectedEmoji: [
      {
        emojiOwnerId: "",
        emojiName: "",
      },
      {
        emojiOwnerId: "",
        emojiName: "",
      },
    ],
  };

  const addnewMessageHandle = async () => {
    const chatId =
      uid > selectedUserFriend.uid
        ? uid + selectedUserFriend.uid
        : selectedUserFriend.uid + uid;

    if (!textMessageInput) {
      return;
    }
    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion(newMessage),
    });
    setTextMessageInput("");
  };

  return (
    <div className="home_container">
      {Object.keys(selectedUserFriend).length <= 0 ? (
        <h3>Please select someone to chat messages</h3>
      ) : (
        <div className={`messages_container ${theme}`}>
          <div className={`messages_navbar_wrapper ${theme}`}>
            <div className="message_friend_wrapper">
              <div className="user_info_wrapper">
                <img
                  src="https://i.ytimg.com/vi/5StX7v97vwA/maxresdefault.jpg"
                  alt=""
                />
                <h3>{selectedUserFriend?.displayName}</h3>
              </div>
              <div className="message_navbar_icon_wrapper">
                <FiPhoneCall className="message_navbar_icon" />
                <BsCameraVideo className="message_navbar_icon" />
              </div>
            </div>
          </div>
          <MessagesContainer />
          <div className="messages_input_container">
            <input
              placeholder="Message..."
              value={textMessageInput}
              onChange={(e) => setTextMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addnewMessageHandle()}
            />
            <div className="messages_icon_container">
              <AiFillPicture className="input_container_icon" />
              <BsEmojiLaughing className="input_container_icon" />
            </div>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

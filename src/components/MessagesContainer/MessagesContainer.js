import React, { useEffect, useRef, useState } from "react";
import Message from "../Message/Message";
import "./messagesContainer.scss";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { doc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
const MessagesContainer = () => {
  const { selectedUserFriend } = useSelector((state) => state.selectedFriend);
  const { uid } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatId =
      uid > selectedUserFriend.uid
        ? uid + selectedUserFriend.uid
        : selectedUserFriend.uid + uid;

    const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      setMessages(doc.data());
    });

    return () => unsub();
  }, [selectedUserFriend.uid]);

  const [showArrowIcon, setShowArrowIcon] = useState(false);
  const messageContainerRef = useRef();
  const goToBottomHandle = () => {
    const element = messageContainerRef.current;
    element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
  };

  const messageContainerScrollHandle = () => {
    const currentScroll = messageContainerRef.current.scrollTop;
    const containerHeight = messageContainerRef.current.scrollHeight;
    if (containerHeight - currentScroll >= 1200) {
      setShowArrowIcon(true);
      return;
    }
    if (containerHeight - currentScroll <= 900) {
      setShowArrowIcon(false);
      return;
    }
  };

  useEffect(() => {
    setShowArrowIcon(false);
  }, [selectedUserFriend]);

  return (
    <div
      className="messages_area_container"
      ref={messageContainerRef}
      onScroll={messageContainerScrollHandle}
    >
      {messages?.messages?.map((msg) => (
        <Message msg={msg} key={msg.messageId} />
      ))}
      {showArrowIcon ? (
        <BsFillArrowDownCircleFill
          className="scroll_to_bottom_icon"
          onClick={goToBottomHandle}
        />
      ) : null}
    </div>
  );
};

export default MessagesContainer;

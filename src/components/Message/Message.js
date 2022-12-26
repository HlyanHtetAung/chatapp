import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import ImageMessage from "../ImageMessage/ImageMessage";
import MessageInfo from "../MessageInfo/MessageInfo";
import "./message.scss";

const Message = ({ msg }) => {
  const messageRef = useRef();
  const { uid, photoURL } = useSelector((state) => state.user);

  useEffect(() => {
    const element = messageRef.current;
    element.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="message_container" ref={messageRef}>
      <div
        className={
          uid === msg.messageOwnerId
            ? "message_wrapper owner"
            : "message_wrapper"
        }
      >
        <img className="user_image" src={msg.messageOwnerPhotoURL} alt="" />
        <div
          className={
            uid === msg.messageOwnerId ? "message_info owner" : "message_info"
          }
        >
          {msg.photoMessageURL ? <ImageMessage msg={msg} /> : null}
          {msg.letterMessage ? <MessageInfo msg={msg} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Message;

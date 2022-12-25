import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import ImageMessage from "../ImageMessage/ImageMessage";
import MessageInfo from "../MessageInfo/MessageInfo";
import "./message.scss";

const Message = ({ msg }) => {
  const messageRef = useRef();
  const { uid } = useSelector((state) => state.user);
  useEffect(() => {
    const element = messageRef.current;
    element.scrollIntoView({ behaviour: "smooth" });
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
        <img
          className="user_image"
          src="https://akns-images.eonline.com/eol_images/Entire_Site/2022620/rs_1200x1200-220720071814-1200-Jennie-Kim-KD-072022.jpg?fit=around%7C1200:1200&output-quality=90&crop=1200:1200;center,top"
          alt=""
        />
        <div
          className={
            uid === msg.messageOwnerId ? "message_info owner" : "message_info"
          }
        >
          {msg.photoMessageURL ? <ImageMessage msg={msg} /> : null}
          <MessageInfo msg={msg} />
        </div>
      </div>
    </div>
  );
};

export default Message;

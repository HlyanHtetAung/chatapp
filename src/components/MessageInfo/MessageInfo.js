import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import Emojis from "../Emojis/Emojis";

const MessageInfo = ({ msg }) => {
  const [click, setClick] = useState(false);

  return (
    <>
      <div className="message">
        <p>{msg.letterMessage}</p>
        <BsPlus
          className="message_plus_icon"
          onClick={() => setClick((prev) => !prev)}
        />
      </div>
      <Emojis click={click} />
    </>
  );
};

export default MessageInfo;

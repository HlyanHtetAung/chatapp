import React, { useEffect, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { clickOutsideContainer } from "../../resuableFunctions/detectClickOutside";
import Emojis from "../Emojis/Emojis";

const MessageInfo = ({ msg }) => {
  const [click, setClick] = useState(false);
  const messageRef = useRef();

  useEffect(() => {
    function toCleanUpFunctionBeforeMount(e) {
      setClick(clickOutsideContainer(messageRef, e.target));
    }
    window.addEventListener("click", toCleanUpFunctionBeforeMount);
    return () =>
      window.removeEventListener("click", toCleanUpFunctionBeforeMount);
  }, []);

  return (
    <>
      <div className="message" ref={messageRef}>
        <p>{msg.letterMessage}</p>
        <BsPlus
          className="message_plus_icon"
          onClick={() => setClick((prev) => !prev)}
        />
      </div>
      <Emojis click={click} msg={msg} />
    </>
  );
};

export default MessageInfo;

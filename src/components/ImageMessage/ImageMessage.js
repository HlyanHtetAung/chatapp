import React, { useEffect, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { clickOutsideContainer } from "../../resuableFunctions/detectClickOutside";
import Emojis from "../Emojis/Emojis";
import "./imageMessage.scss";

const ImageMessage = ({ msg }) => {
  const [click, setClick] = useState(false);
  const imageContainerRef = useRef();

  useEffect(() => {
    function toCleanUpFunctionBeforeMount(e) {
      setClick(clickOutsideContainer(imageContainerRef, e.target));
    }
    window.addEventListener("click", toCleanUpFunctionBeforeMount);
    return () =>
      window.removeEventListener("click", toCleanUpFunctionBeforeMount);
  }, []);

  return (
    <>
      <div className="message_image_wrapper" ref={imageContainerRef}>
        <img className="message_image" src={msg.photoMessageURL} alt="" />
        <BsPlus
          className="plus_icon"
          onClick={() => setClick((prev) => !prev)}
        />
      </div>
      <Emojis click={click} msg={msg} />
    </>
  );
};

export default ImageMessage;

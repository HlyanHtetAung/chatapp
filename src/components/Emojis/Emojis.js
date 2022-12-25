import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiAngry, BiHappyHeartEyes, BiSad } from "react-icons/bi";
import { BsHandThumbsUp } from "react-icons/bs";
import SelectedIcon from "../SelectedIcon/SelectedIcon";

import "./emojis.scss";

const Emojis = ({ click }) => {
  const [selectedEmoji, setSelectedEmoji] = useState("");

  return (
    <div>
      <div className={click ? "emoji_container active" : "emoji_container"}>
        <AiOutlineHeart
          className="emoji_icon"
          name="AiOutlineHeart"
          onClick={() => setSelectedEmoji("AiOutlineHeart")}
        />
        <BsHandThumbsUp
          className="emoji_icon"
          onClick={() => setSelectedEmoji("BsHandThumbsUp")}
        />
        <BiHappyHeartEyes
          className="emoji_icon"
          onClick={() => setSelectedEmoji("BiHappyHeartEyes")}
        />
        <BiSad
          className="emoji_icon"
          onClick={() => setSelectedEmoji("BiSad")}
        />
        <BiAngry
          className="emoji_icon"
          onClick={() => setSelectedEmoji("BiAngry")}
        />
      </div>

      {selectedEmoji === "AiOutlineHeart" ? (
        <AiOutlineHeart />
      ) : selectedEmoji === "BsHandThumbsUp" ? (
        <BsHandThumbsUp />
      ) : selectedEmoji === "BiHappyHeartEyes" ? (
        <BiHappyHeartEyes />
      ) : selectedEmoji === "BiSad" ? (
        <BiSad />
      ) : (
        selectedEmoji === "BiAngry" && <BiAngry />
      )}

      {/* <AiOutlineHeart /> */}
    </div>
  );
};

export default Emojis;

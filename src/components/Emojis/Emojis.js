import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiAngry, BiHappyHeartEyes, BiSad } from "react-icons/bi";
import { BsHandThumbsUp } from "react-icons/bs";
import { useSelector } from "react-redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import "./emojis.scss";
import { db } from "../../firebase";

const Emojis = ({ click, msg }) => {
  const { uid } = useSelector((state) => state.user);
  const { selectedUserFriend } = useSelector((state) => state.selectedFriend);

  const handleSelectEmoji = async (iconName) => {
    const currentUserId = uid;
    const selectedFriendId = selectedUserFriend.uid;
    const chatId =
      currentUserId > selectedFriendId
        ? currentUserId + selectedFriendId
        : selectedFriendId + currentUserId;

    const messageRef = doc(db, "chats", chatId);
    const messageDoc = await getDoc(doc(db, "chats", chatId));

    const copiedMesage = [...messageDoc.data().messages];
    const finalUpdatedMessage = copiedMesage.map((message) => {
      if (message.messageId === msg.messageId) {
        return {
          ...message,
          selectedEmoji: message.selectedEmoji.map((emoji) => {
            if (emoji.emojiOwnerId === uid) {
              return { ...emoji, emojiName: iconName };
            }
            return emoji;
          }),
        };
      }
      return message;
    });

    await updateDoc(messageRef, {
      messages: finalUpdatedMessage,
    });
  };

  return (
    <div className="emoji_conatiner_wrapper">
      {msg.messageOwnerId !== uid
        ? msg.selectedEmoji?.map((emoji) =>
            emoji.emojiName === "AiOutlineHeart" ? (
              <AiOutlineHeart
                className="selected_emoji"
                key={emoji.emojiOwnerId}
              />
            ) : emoji.emojiName === "BsHandThumbsUp" ? (
              <BsHandThumbsUp
                className="selected_emoji"
                key={emoji.emojiOwnerId}
              />
            ) : emoji.emojiName === "BiHappyHeartEyes" ? (
              <BiHappyHeartEyes
                className="selected_emoji"
                key={emoji.emojiOwnerId}
              />
            ) : emoji.emojiName === "BiSad" ? (
              <BiSad className="selected_emoji" key={emoji.emojiOwnerId} />
            ) : (
              emoji.emojiName === "BiAngry" && (
                <BiAngry className="selected_emoji" key={emoji.emojiOwnerId} />
              )
            )
          )
        : null}
      <div className={click ? "emoji_container active" : "emoji_container"}>
        <AiOutlineHeart
          className="emoji_icon"
          name="AiOutlineHeart"
          onClick={() => {
            handleSelectEmoji("AiOutlineHeart");
          }}
        />
        <BsHandThumbsUp
          className="emoji_icon"
          onClick={() => handleSelectEmoji("BsHandThumbsUp")}
        />
        <BiHappyHeartEyes
          className="emoji_icon"
          onClick={() => handleSelectEmoji("BiHappyHeartEyes")}
        />
        <BiSad
          className="emoji_icon"
          onClick={() => handleSelectEmoji("BiSad")}
        />
        <BiAngry
          className="emoji_icon"
          onClick={() => handleSelectEmoji("BiAngry")}
        />
      </div>
      {msg.messageOwnerId === uid
        ? msg.selectedEmoji?.map((emoji) =>
            emoji.emojiName === "AiOutlineHeart" ? (
              <AiOutlineHeart
                className="selected_emoji"
                key={emoji.emojiOwnerId}
              />
            ) : emoji.emojiName === "BsHandThumbsUp" ? (
              <BsHandThumbsUp
                className="selected_emoji"
                key={emoji.emojiOwnerId}
              />
            ) : emoji.emojiName === "BiHappyHeartEyes" ? (
              <BiHappyHeartEyes
                className="selected_emoji"
                key={emoji.emojiOwnerId}
              />
            ) : emoji.emojiName === "BiSad" ? (
              <BiSad className="selected_emoji" key={emoji.emojiOwnerId} />
            ) : (
              emoji.emojiName === "BiAngry" && (
                <BiAngry className="selected_emoji" key={emoji.emojiOwnerId} />
              )
            )
          )
        : null}
    </div>
  );
};

export default Emojis;

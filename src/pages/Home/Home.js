import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BsCameraVideo, BsEmojiLaughing } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { FiPhoneCall } from "react-icons/fi";
import { AiFillPicture } from "react-icons/ai";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import "./home.scss";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import MessagesContainer from "../../components/MessagesContainer/MessagesContainer";
import { db, storage } from "../../firebase";
import { v4 } from "uuid";

const Home = () => {
  const { theme } = useSelector((state) => state.theme);
  const { selectedUserFriend } = useSelector((state) => state.selectedFriend);
  const [textMessageInput, setTextMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [textImage, setTextImage] = useState({
    textImageFile: "",
    textImageURL: "",
  });
  const { uid, photoURL } = useSelector((state) => state.user);
  console.log(photoURL);
  const inputImageRef = useRef();

  const addnewMessageHandle = async () => {
    if (!textMessageInput && !textImage.textImageURL) {
      return;
    }

    const chatId =
      uid > selectedUserFriend.uid
        ? uid + selectedUserFriend.uid
        : selectedUserFriend.uid + uid;

    if (textMessageInput && textImage.textImageURL) {
      setLoading(true);
      try {
        const uploadTask = uploadBytesResumable(
          ref(storage, `chatImages/${chatId + v4()}`),
          textImage.textImageFile
        );
        uploadTask.on("state_changed", () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const newMessage = {
              messageId: v4(),
              messageOwnerId: uid,
              messageOwnerPhotoURL: photoURL,
              letterMessage: textMessageInput,
              photoMessageURL: downloadURL,

              selectedEmoji: [
                {
                  emojiOwnerPhotoURL: photoURL,
                  emojiOwnerId: uid,
                  emojiName: "",
                },
                {
                  emojiOwnerPhotoURL: selectedUserFriend.photoURL,
                  emojiOwnerId: selectedUserFriend.uid,
                  emojiName: "",
                },
              ],
            };
            await updateDoc(doc(db, "chats", chatId), {
              messages: arrayUnion(newMessage),
            });
            setLoading(false);
          });
          setTextMessageInput("");
          setTextImage({ textImageFile: "", textImageURL: "" });
        });
      } catch (e) {
        console.log(e.message);
      }
      return;
    }
    if (textMessageInput) {
      setLoading(true);
      const newMessage = {
        messageId: v4(),
        messageOwnerId: uid,
        messageOwnerPhotoURL: photoURL,
        letterMessage: textMessageInput,
        photoMessageURL: "",
        selectedEmoji: [
          {
            emojiOwnerPhotoURL: photoURL,
            emojiOwnerId: uid,
            emojiName: "",
          },
          {
            emojiOwnerPhotoURL: selectedUserFriend.photoURL,
            emojiOwnerId: selectedUserFriend.uid,
            emojiName: "",
          },
        ],
      };
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion(newMessage),
      });
      setLoading(false);
      setTextMessageInput("");
      setTextImage({ textImageFile: "", textImageURL: "" });
      return;
    }

    if (textImage.textImageURL) {
      setLoading(true);

      try {
        const uploadTask = uploadBytesResumable(
          ref(storage, `chatImages/${chatId + v4()}`),
          textImage.textImageFile
        );
        uploadTask.on("state_changed", () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const newMessage = {
              messageId: v4(),
              messageOwnerId: uid,
              messageOwnerPhotoURL: photoURL,
              letterMessage: "",
              photoMessageURL: downloadURL,
              selectedEmoji: [
                {
                  emojiOwnerPhotoURL: photoURL,
                  emojiOwnerId: uid,
                  emojiName: "",
                },
                {
                  emojiOwnerPhotoURL: selectedUserFriend.photoURL,
                  emojiOwnerId: selectedUserFriend.uid,
                  emojiName: "",
                },
              ],
            };
            await updateDoc(doc(db, "chats", chatId), {
              messages: arrayUnion(newMessage),
            });
            setLoading(false);
          });
          setTextMessageInput("");
          setTextImage({ textImageFile: "", textImageURL: "" });
        });
      } catch (e) {
        console.log(e.message);
      }
      return;
    }
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
                <img src={selectedUserFriend.photoURL} alt="" />
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
            {loading ? (
              <div className="sending_loading_container">
                <h3>Sending</h3>
                <div className="loading_circle_container"></div>
              </div>
            ) : null}
            {textImage.textImageURL ? (
              <div className="uploadImage_container">
                <RxCross2
                  className="remove_image_icon"
                  onClick={() => {
                    setTextImage({
                      textImageFile: "",
                      textImageURL: "",
                    });
                  }}
                />
                <img className="uploadImage" src={textImage.textImageURL} />
              </div>
            ) : null}
            <input
              placeholder="Message..."
              value={textMessageInput}
              onChange={(e) => setTextMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addnewMessageHandle()}
            />
            <div className="messages_icon_container">
              <input
                type="file"
                style={{ display: "none" }}
                ref={inputImageRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  const imageURL = URL.createObjectURL(file);
                  setTextImage({
                    textImageFile: file,
                    textImageURL: imageURL,
                  });
                }}
              />
              <AiFillPicture
                className="input_container_icon"
                onClick={() => {
                  inputImageRef.current.click();
                }}
              />
              {/* <BsEmojiLaughing className="input_container_icon" /> */}
            </div>
            <button onClick={addnewMessageHandle}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

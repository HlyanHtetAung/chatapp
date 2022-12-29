import React, { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeDarkTheme, changeLightTheme } from "../redux/themeSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Register = () => {
  const { theme } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const userInputInititalState = {
    email: "",
    password: "",
    displayName: "",
    imageFileURL: "",
    imageFile: "",
  };
  const [userInput, setUserInput] = useState(userInputInititalState);

  const handleChangeUserInput = (e) => {
    const toChangeObjProperty = e.target.name;
    const value = e.target.value;
    setUserInput((prev) => ({
      ...prev,
      [toChangeObjProperty]: value,
    }));
  };

  const handleChangeImageInput = (e) => {
    const file = e.target.files[0];
    const fileImageURL = URL.createObjectURL(file);
    setUserInput((prev) => ({
      ...prev,
      imageFileURL: fileImageURL,
      imageFile: file,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userInput.imageFile) {
      setError("Need an image to create user");
      const removeError = () => {
        setError("");
      };
      setTimeout(removeError, 3000);
      clearTimeout(removeError);
      setLoading(false);
    }
    try {
      setLoading(true);
      const uploadTask = uploadBytesResumable(
        ref(storage, `profileImages/${userInput.displayName + v4()}`),
        userInput.imageFile
      );
      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const user = await createUserWithEmailAndPassword(
            auth,
            userInput.email,
            userInput.password
          ).catch((error) => {
            setLoading(false);
            setError(error.message);
            const removeError = () => {
              setError("");
            };
            setTimeout(removeError, 3000);
            clearTimeout(removeError);
            return;
          });

          await updateProfile(user.user, {
            displayName: userInput.displayName,
            photoURL: downloadURL,
          }).catch((error) => {
            setLoading(false);
            setError(error.message);
            const removeError = () => {
              setError("");
            };
            setTimeout(removeError, 3000);
            clearTimeout(removeError);
            return;
          });
          await setDoc(doc(db, "users", user.user.uid), {
            uid: user.user.uid,
            displayName: userInput.displayName,
            email: userInput.email,
            friends: [],
            firendRequest: [],
            photoURL: user.user.photoURL,
          }).catch((error) => {
            setLoading(false);
            setError(error.message);
            const removeError = () => {
              setError("");
            };
            setTimeout(removeError, 3000);
            clearTimeout(removeError);

            return;
          });
          setLoading(false);
          setUserInput(userInputInititalState);
          navigate("/signIn");
        });
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);

      const removeError = () => {
        setError("");
      };

      setTimeout(removeError, 3000);
      clearTimeout(removeError);
    }
  };

  return (
    <div className={`form_container ${theme}`}>
      <div className="form_wrapper">
        <div className="form_header_wrapper">
          <h3 className="form_header">Chat App</h3>
          {theme === "dark" ? (
            <FaMoon
              className="form_header_icon"
              onClick={() => dispatch(changeLightTheme())}
            />
          ) : (
            <BsSunFill
              className="form_header_icon"
              onClick={() => dispatch(changeDarkTheme())}
            />
          )}
        </div>
        <form onSubmit={handleRegister}>
          <div className="form_image_input_container">
            <div className="image_container">
              <input
                accept="image*/"
                type="file"
                style={{ display: "none" }}
                id="file"
                name="imageFileURL"
                onChange={handleChangeImageInput}
              />
              {userInput.imageFile ? (
                <label className="image_container" htmlFor="file">
                  <img src={userInput.imageFileURL} alt="" />
                </label>
              ) : (
                <label
                  className="image_click_to_add_image_container"
                  htmlFor="file"
                >
                  <p>Profile Image</p>
                </label>
              )}
            </div>
          </div>
          <div className="form_input_container">
            <input
              type="text"
              required
              name="email"
              onChange={handleChangeUserInput}
              value={userInput.email}
              autoComplete="off"
            />
            <span>Email</span>
          </div>
          <div className="form_input_container">
            <input
              type="password"
              required
              name="password"
              onChange={handleChangeUserInput}
              value={userInput.password}
            />
            <span>Password</span>
          </div>
          <div className="form_input_container">
            <input
              type="text"
              required
              name="displayName"
              onChange={handleChangeUserInput}
              value={userInput.displayName}
              autoComplete="off"
            />
            <span>Display Name</span>
          </div>
          <button>
            Register {loading ? <div className="loading_wrapper"></div> : null}
          </button>
        </form>
        <p>
          You already have an account?{" "}
          <span onClick={() => navigate("/")}>Sign In</span>
        </p>
        {error ? (
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Register;

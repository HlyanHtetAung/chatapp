import React, { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeDarkTheme, changeLightTheme } from "../redux/themeSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const userInputInititalState = {
    email: "",
    password: "",
    displayName: "",
  };
  const [userInput, setUserInput] = useState(userInputInititalState);

  const handleChangeUserInput = (e) => {
    const toChangeObjProperty = e.target.name;
    const value = e.target.value;
    setUserInput((prev) => ({ ...prev, [toChangeObjProperty]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userInput.email,
        userInput.password
      );
      await updateProfile(user.user, {
        displayName: userInput.displayName,
      });
      await setDoc(doc(db, "users", user.user.uid), {
        uid: user.user.uid,
        displayName: userInput.displayName,
        email: userInput.email,
        friends: [],
        firendRequest: [],
        photoURL: "",
      });
      setUserInput(userInputInititalState);
      navigate("/signIn");
    } catch (err) {
      setError(err.message);
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
          <button>Register</button>
        </form>
        <p>
          You already have an account?{" "}
          <span onClick={() => navigate("/")}>Sign In</span>
        </p>
        {error ? <span>{error}</span> : null}
      </div>
    </div>
  );
};

export default Register;

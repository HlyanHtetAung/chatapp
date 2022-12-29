import React, { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeDarkTheme, changeLightTheme } from "../redux/themeSlice";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { login } from "../redux/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { theme } = useSelector((state) => state.theme);
  const [error, setError] = useState("");
  const userInputIntitalState = { email: "", password: "" };
  const [userInput, setUserInput] = useState(userInputIntitalState);

  const handleSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userInput.email,
        userInput.password
      );
      dispatch(
        login({
          displayName: user.user.displayName,
          email: user.user.email,
          uid: user.user.uid,
          photoURL: user.user.photoURL,
        })
      );
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);

      const removeError = () => {
        setError("");
      };
      setTimeout(removeError, 3000);
      clearTimeout(removeError);
    }
  };

  const handleChangeUserInput = (e) => {
    const toChangeObjProperty = e.target.name;
    const value = e.target.value;
    setUserInput((prev) => ({
      ...prev,
      [toChangeObjProperty]: value,
    }));
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
        <form onSubmit={handleSignIn}>
          <div className="form_input_container">
            <input
              type="text"
              required
              autoComplete="off"
              name="email"
              onChange={handleChangeUserInput}
              value={userInput.email}
            />
            <span>Email</span>
          </div>
          <div className="form_input_container">
            <input
              type="password"
              required
              autoComplete="off"
              name="password"
              onChange={handleChangeUserInput}
              value={userInput.password}
            />
            <span>Password</span>
          </div>
          <button>
            Sign In {loading ? <div className="loading_wrapper"></div> : null}
          </button>
        </form>
        <p>
          Don't you have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
        {error ? (
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default SignIn;

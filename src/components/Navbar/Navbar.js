import React, { useEffect, useState } from "react";

import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { MdOutlineLocationSearching } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "firebase/auth";
import "./navbar.scss";
import User from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import { changeDarkTheme, changeLightTheme } from "../../redux/themeSlice";
import { auth, db } from "../../firebase";
import { logout } from "../../redux/userSlice";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  setSelectedFriend,
  unSetSelectedFirend,
} from "../../redux/selectedFriendSlice";
const Navbar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { displayName, uid } = useSelector((state) => state.user);
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();

  const signOutHandle = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      dispatch(unSetSelectedFirend());
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    // const q = query(collection(db, "cities"), where("state", "==", "CA"));
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      setAllUsers(
        snapshot.docs.map((doc) => doc.data()).filter((usr) => usr.uid !== uid)
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`navbar_container ${theme} active`}>
      <div className="navbar_header_wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h3 className="navbar_header">Chat App</h3>
        </Link>

        {theme === "dark" ? (
          <FaMoon
            className="navbar_header_icon"
            onClick={() => dispatch(changeLightTheme())}
          />
        ) : (
          <BsSunFill
            className="navbar_header_icon"
            onClick={() => dispatch(changeDarkTheme())}
          />
        )}
      </div>
      <div className="navbar_middle_wrapper">
        <div className="navbar_search_container">
          <MdOutlineLocationSearching className="navbar_search_icon" />
          <input type="text" placeholder="Find a user" />
        </div>
        <div className="users_wrapper">
          {allUsers.map((usr) => (
            <User key={usr.uid} displayName={usr.displayName} usr={usr} />
          ))}
        </div>
      </div>
      <Link to={`/userSettings/${uid}`} style={{ textDecoration: "none" }}>
        <div className="currentUser_container">
          <div className="currentUser_info_wrapper">
            <img
              src="https://kpopping.com/documents/91/3/1500/220908-TWICE-Jihyo-documents-1.jpeg?v=b5cfb"
              alt=""
            />
            <h3>{displayName}</h3>
          </div>
        </div>
      </Link>

      <div className="logout_wrapper" onClick={signOutHandle}>
        <h3>Logout</h3>
        <RiLogoutBoxLine className="logout_icon" />
      </div>
    </div>
  );
};

export default Navbar;

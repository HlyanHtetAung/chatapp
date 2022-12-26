import "./app.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home/Home";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";

import { login } from "./redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import CurrentUserEditPage from "./pages/CurrentUserEditPage/CurrentUserEditPage";

function App() {
  const { displayName } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const ProtectedRoute = ({ children }) => {
    if (!displayName) {
      return <Navigate to="/signIn" />;
    }
    return children;
  };

  const ProtectedRouteOnLoggedIn = ({ children }) => {
    if (displayName) {
      return <Navigate to="/" />;
    }
    return children;
  };

  // Set user when user is already logged in
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
          })
        );
      }
    });
  }, [displayName, dispatch]);

  return (
    <BrowserRouter>
      <div className="app_container">
        <div className="app_wrapper">
          {displayName && <Navbar />}
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="register"
                element={
                  <ProtectedRouteOnLoggedIn>
                    <Register />
                  </ProtectedRouteOnLoggedIn>
                }
              />
              <Route
                path="signIn"
                element={
                  <ProtectedRouteOnLoggedIn>
                    <SignIn />
                  </ProtectedRouteOnLoggedIn>
                }
              />
              <Route
                path="/userSettings/:userId"
                element={
                  <ProtectedRoute>
                    <CurrentUserEditPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

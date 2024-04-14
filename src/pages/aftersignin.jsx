import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";
import SignUpPage from "./signup";
import SignInPage from "./signin";
// import "./AfterSignIn.css"
const auth = getAuth(app);

function AfterSign() {
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="container">
      <h1 className="title">Hunger Watch</h1>
      {user ? (
        <div className="user-info">
          <h2>
            Hello {user.email}, You Could Now Proceed To Community Section
          </h2>
          <button onClick={handleSignOut} className="signout-button">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="auth-container">
          <div className="signup-container">
            <SignUpPage />
          </div>
          <hr className="divider" />
          <div className="signin-container">
            <SignInPage />
          </div>
        </div>
      )}
    </div>
  );
}

export default AfterSign;

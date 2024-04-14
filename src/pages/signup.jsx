import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../firebase";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => alert("Success"))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h2 style={{ marginBottom: "20px" }}>Sign Up</h2>
      <label style={{ display: "block", marginBottom: "10px" }}>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        required
        placeholder="Enter Email"
        style={{
          width: "80%",
          maxWidth: "400px",
          marginBottom: "20px",
          padding: "10px",
          fontSize: "16px",
        }}
      />
      <br />
      <label style={{ display: "block", marginBottom: "10px" }}>Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        required
        placeholder="Enter Password"
        style={{
          width: "80%",
          maxWidth: "400px",
          marginBottom: "20px",
          padding: "10px",
          fontSize: "16px",
        }}
      />
      <br />
      <button
        onClick={createUser}
        style={{
          padding: "12px 24px",
          borderRadius: "5px",
          backgroundColor: "#2ecc71",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sign Up
      </button>
      <button
        onClick={signUpWithGoogle}
        style={{
          padding: "12px 24px",
          borderRadius: "5px",
          backgroundColor: "#3498db",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sign In / Up With Google
      </button>
    </div>
  );
};

export default SignUpPage;

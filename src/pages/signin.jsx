import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => alert("Success"))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h2 style={{ marginBottom: "20px" }}>Sign In Here</h2>
      <label style={{ display: "block", marginBottom: "10px" }}>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter Email"
        type="email"
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
        placeholder="Enter Password"
        type="password"
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
        onClick={signInUser}
        style={{
          padding: "12px 24px",
          borderRadius: "5px",
          backgroundColor: "#3498db",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sign Me In
      </button>
    </div>
  );
};

export default SignInPage;

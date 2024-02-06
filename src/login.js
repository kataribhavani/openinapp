import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import icon from "./icon.svg";
import tilt from "./tilt.svg";
import apple from "./apple.svg";
import google from "./google.svg";
import base from './base.svg';
import text from './text.svg';
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const history = useNavigate();
  return (
    <div className="flex flex-row">
      <span className="relative">
        <img src={logo} alt="logo" />
        <img src={icon} alt="icon" className="absolute top-10 left-10" />
        <img src={tilt} alt="tilt" className="absolute top-16 left-9" />
        <img src={text} alt="text" className="absolute top-56 left-28" />
        <img src={base} alt="base" className="absolute bottom-16 left-9" />
      </span>
      <span className="right">
        <span className="flex flex-col justify-center items-center mt-14 space-y-2">
          <div className="title">Sign In</div>
          <div className="label">Sign in to your account</div>
          <span>
            <button className="googlebutton">
              <span className="flex space-x-2 justify-center">
                <img src={google} alt="google" />
                <span className="placeholder">Sign in with Google</span>
              </span>
            </button>
            <button className="googlebutton">
              <span className="flex space-x-2 justify-center">
                <img src={apple} alt="apple" />
                <span className="placeholder">Sign in with Apple</span>
              </span>
            </button>
          </span>
          <form
            className="form"
            onSubmit={(e) => {
              if (email && password) {
                history("/upload");
              } else {
                e.preventDefault();
                if (!email) {
                  emailRef?.current?.focus();
                } else {
                  passwordRef?.current?.focus();
                }
              }
            }}
          >
            <span className="flex flex-col space-y-4">
              <span className="flex flex-col space-y-2">
                <span className="label">Email</span>
                <input
                  className="inputs"
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </span>
              <span className="flex flex-col space-y-2">
                <span className="label">Password</span>
                <input
                  className="inputs"
                  type="password"
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </span>
              <span className="text-blue-400 cursor-pointer text-sm">Forgot password?</span>
              <button className="submitbutton" type="submit">
                <span className="text-white">Sign In</span>
              </button>
              <span className="placeholder">
                Don't have an account?{" "}
                <span className="text-blue-400 cursor-pointer text-sm">Register here</span>
              </span>
            </span>
          </form>
        </span>
      </span>
    </div>
  );
}

export default Login;

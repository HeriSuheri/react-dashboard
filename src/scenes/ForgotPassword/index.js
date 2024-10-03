import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { CircularProgress } from "@mui/material";

import { auth } from "../../config/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "../login/login.css";

import { setLocalStorage, removeLocalStorage } from "../../utils/helpers";

function Forgot() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // // const history = useHistory();
  // // State for the "Remember me" checkbox
  // // const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({ open: false, message: "" });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [popup, setPopup] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError({ ...error, open: false, message: "" });
      }, 20000);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    setEmailError(false);
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        alert(
          "Please verify your email to reset your password, Only registered accounts will receive emails !"
        );
        setLoadingLogin(false);
        setPopup(true);
        navigate("/");
      })
      .catch((err) => {
        setLoadingLogin(false);
        setError({ open: true, message: err.message });
      });
  };

  const onTypeEmail = (e) => {
    if (e.target.value) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    setEmail(e.target.value);
  };

  return (
    <div className="wrapper3">
      <div className="login_box">
        <div className="login-header-forgot">
          <span>Reset Password</span>
        </div>
        <div className="input_box">
          <input
            type="text"
            id="user"
            className="input-field"
            onChange={onTypeEmail}
            value={email}
            required
            autoComplete="off"
          />
          <label htmlFor="user" className="label">
            Email
          </label>
          <i className="bx bx-user icon"></i>
        </div>
        {emailError ? (
          <div className="error-user">
            <p className="errors">Please enter Email</p>
          </div>
        ) : null}

        {loadingLogin ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <CircularProgress size={40} color="warning"/>
          </div>
        ) : (
          <div className="input_box">
            <input
              type="submit"
              className="input-submit"
              value="SEND EMAIL"
              onClick={handleSubmit}
              disabled={!email || emailError}
              style={{
                color: "#808080",
                cursor: !email || emailError ? "not-allowed" : "pointer",
              }}
            />
          </div>
        )}

        {error ? (
          <div className="error-user">
            <p className="errors">{error?.message}</p>
          </div>
        ) : null}

        <div className="regis">
          <div className="text">Don't have an account ? </div>
          <div className="zoom">
            <Link className="text" to="/registrasi" style={{ color: "white" }}>
              Sign Up
            </Link>
          </div>
        </div>
        <div className="regis">
          <div className="text">Already have an account ? </div>
          <div className="zoom">
            <Link className="text" to="/" style={{ color: "white" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;

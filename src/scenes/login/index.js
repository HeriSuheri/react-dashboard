import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { CircularProgress } from "@mui/material";

import { auth } from "../../config/Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "./login.css";

import { setLocalStorage, removeLocalStorage } from "../../utils/helpers";

function Login() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // // const history = useHistory();
  // // State for the "Remember me" checkbox
  // // const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({ open: false, message: "" });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [popup, setPopup] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError({ ...error, open: false, message: "" });
      }, 20000);
    }
  }, [error]);

  useEffect(() => {
    if (currentUser) {
      setLocalStorage("user", currentUser);
      // history.push(pathNameCONFIG.DASHBOARD);
      navigate("/dashboard");
    }
  }, [currentUser]);

  // // useEffect(() => {
  // //   if (loadingLogin) {
  // //     setTimeout(() => {
  // //       setLoadingLogin(false);
  // //       history.push(pathNameCONFIG.DASHBOARD);
  // //     }, 3500);
  // //   }
  // // }, [loadingLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    setEmailError(false);
    setPasswordError(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res?.user.emailVerified) {
          setLoadingLogin(false);
          onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
          });
        } else {
          setLoadingLogin(false);
          setPopup(true);
          setError({ open: true, message: "Email belum Di Verifikasi" });
        }
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

  const onTypePassword = (e) => {
    if (e.target.value) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
    setPassword(e.target.value);
  };

  return (
    <div className="wrapper1">
      <div className="login_box">
        <div className="login-header">
          <span>Login</span>
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

        <div className="input_box">
          <input
            type="password"
            id="pass"
            className="input-field"
            onChange={onTypePassword}
            value={password}
            required
          />
          <label htmlFor="pass" className="label">
            Password
          </label>
          <i className="bx bx-lock-alt icon"></i>
        </div>
        {passwordError ? (
          <div className="error-user">
            <p className="errors">Please enter Password</p>
          </div>
        ) : null}

        <div className="remember-forgot">
          <div className="forgot">
            <div className="zoom">
              <Link to="/forgot-password" className="text">
                Reset Password?
              </Link>
            </div>
          </div>
        </div>

        {loadingLogin ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <CircularProgress size={40} />
          </div>
        ) : (
          <div className="input_box">
            <input
              type="submit"
              className="input-submit"
              value="Login"
              onClick={handleSubmit}
              disabled={!email || !password || emailError || passwordError}
              style={{
                color: "#808080",
                cursor:
                  !email || !password || emailError || passwordError
                    ? "not-allowed"
                    : "pointer",
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
            <Link className="text" to="/registrasi" style={{ color: "blue" }}>
              Sign Up
            </Link>
          </div>
        </div>
        {/* <div className="regis">
          <div className="text">Back to </div>
          <div className="zoom">
            <Link
              to="/"
              className="text"
              style={{
                color: "blue",
              }}
            >
              HOME
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Login;

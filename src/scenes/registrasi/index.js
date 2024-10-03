import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { CircularProgress } from "@mui/material";

import { auth } from "../../config/Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import "../login/login.css";

import { setLocalStorage, removeLocalStorage } from "../../utils/helpers";

function Regis() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // // const history = useHistory();
  // // State for the "Remember me" checkbox
  // // const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({ open: false, message: "" });
  const [errorMatchPassword, setErrorMatchPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confPasswordError, setConfPasswordError] = useState(false);
  const [popup, setPopup] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError({ ...error, open: false, message: "" });
      }, 20000);
    }
  }, [error]);

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        // setError("Passwords does not match");
      }
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    setEmailError(false);
    setPasswordError(false);
    setConfPasswordError(false);
    if (validatePassword()) {
      // setLoadingRegis(false);
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setLoadingLogin(false);
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setLoadingLogin(false);
              alert("Please verify your email first to activate your account !");
              navigate("/");
              setPopup(true);
            })
            .catch((err) => {
              setLoadingLogin(false);
              setError({ open: true, message: err.message });
            });
        })
        .catch((err) => {
          setLoadingLogin(false);
          setError({ open: true, message: err.message });
        });
    }
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
      if (e.target.value.length && e.target.value !== confirmPassword) {
        setErrorMatchPassword(true);
      } else {
        setErrorMatchPassword(false);
      }
    } else {
      setPasswordError(true);
    }
    setPassword(e.target.value);
  };

  const onTypeConfPassword = (e) => {
    if (e.target.value) {
      setConfPasswordError(false);
      if (e.target.value.length && e.target.value !== password) {
        setErrorMatchPassword(true);
      } else {
        setErrorMatchPassword(false);
      }
    } else {
      setConfPasswordError(true);
    }
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="wrapper2">
      <div className="login_box">
        <div className="login-header">
          <span>Register</span>
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

        <div className="input_box">
          <input
            type="password"
            id="confPass"
            className="input-field-conf"
            value={confirmPassword}
            required
            onChange={onTypeConfPassword}
          />
          <label htmlFor="confPass" className="labelConf">
            Confirm Password
          </label>
          <i className="bx bx-lock-alt icon"></i>
        </div>

        {confPasswordError ? (
          <div className="error-user">
            <p className="errors">Please enter Confirm Password</p>
          </div>
        ) : null}

        {/* <div className="remember-forgot">
          <div className="forgot">
            <div className="zoom">
              <Link to="/forgot-password" className="text">
                Forgot password?
              </Link>
            </div>
          </div>
        </div> */}

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
              value="Register"
              onClick={handleSubmit}
              disabled={
                !email ||
                !password ||
                emailError ||
                passwordError ||
                confPasswordError ||
                errorMatchPassword
              }
              style={{
                color: "#808080",
                cursor:
                  !email ||
                  !password ||
                  emailError ||
                  passwordError ||
                  confPasswordError ||
                  errorMatchPassword
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

        {errorMatchPassword ? (
          <div className="error-user">
            <p className="errors">"Password doesn't match"</p>
          </div>
        ) : null}

        <div className="regis">
          <div className="text">Already have an account ? </div>
          <div className="zoom">
            <Link className="text" to="/" style={{ color: "white" }}>
              Login
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

export default Regis;

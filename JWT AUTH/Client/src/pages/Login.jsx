import React, { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "./css/login.css";
import logo from "./css/images/logo.svg";
import axios from "../axios";
import success from "./css/images/Component 1.svg";
import { CircularProgress } from "@material-ui/core";

function Login() {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [err, setErr] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  //handling login
  const handleUserLogin = async () => {
    setShowLoading(true);
    await axios
      .post("/login", { email: email, password: password })
      .then((res) => {
        setShowLoading(false);
        if (res.data === "WRONG CREDENTIALS") {
          setErr(res.data);
        } else {
          setErr("");
          setShowSuccess(true);
          setTimeout(() => {
            sessionStorage.setItem("token", res.data);
            setShowSuccess(false);
            window.location.reload();
          }, 3000);
        }
      })
      .catch((error) => {
        setShowLoading(false);
        setErr("REQUEST TIMED OUT");
      });
  };
  return (
    <div className="login__page flex__container">
      {showLoading && (
        <>
          <div className="success__background" />
          <div className="login__loader flex__container">
            <CircularProgress />
          </div>
        </>
      )}
      <div className="login__form__container flex__container">
        <img className="login__logo" src={logo} alt="logo"></img>
        <form
          className="login__form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUserLogin();
          }}
        >
          <div className="field">
            <input
              type="email"
              className="email"
              placeholder="Email *"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field flex__container">
            <input
              type={viewPassword ? "text" : `password`}
              className="pasword"
              placeholder="Password *"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {viewPassword ? (
              <VisibilityOffIcon
                onClick={() => setViewPassword(!viewPassword)}
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  width: "20px",
                  height: "20px",
                }}
              />
            ) : (
              <VisibilityIcon
                onClick={() => setViewPassword(!viewPassword)}
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  width: "20px",
                  height: "20px",
                }}
              />
            )}
          </div>
          <div className="error__displayer">{err}</div>
          <button className="login__button" type="submit">
            SIGN IN
          </button>
        </form>
      </div>

      {showSuccess && (
        <>
          <div className="success__background" />
          <div
            className={`success__displayer flex__container ${
              showSuccess && "show__success__displayer"
            }`}
            style={{ animation: `${success ? "fadeIn" : "fadeOut"} 1s` }}
          >
            <img src={success} alt="Success" />
            <div className="success__msg">SUCCESS !</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;

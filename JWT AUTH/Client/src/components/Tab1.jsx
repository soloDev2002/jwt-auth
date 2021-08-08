import React, { useEffect, useRef, useState } from "react";
import "../pages/css/tab1.css";
import axios from "../axios";
import successImg from "../pages/css/images/Component 1.svg";
import failureImg from "../pages/css/images/Component 2.svg";
import { CircularProgress } from "@material-ui/core";
import Homepage from "../pages/Homepage";
function Tab1() {
  const [user, setUser] = useState({
    name: "",
    mobile_no: "",
    email: "",
    address: "",
  });

  const input = useRef();
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [timer, setTimer] = useState(5);
  const [showLoading, setShowLoading] = useState(false);
  //handle user add
  async function handleUserAdd() {
    setShowLoading(true);
    const token = sessionStorage.getItem("token");
    await axios
      .post(
        "/post/addUser",
        { user: user },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => handlingSuccess(res.data))
      .catch((err) => handleTimeout(err));
  }

  //throw error if data is not correct elese display success
  function handlingSuccess(res) {
    setShowLoading(false);
    console.log(res);
    if (res.name === "MongoError") {
      if (res.keyPattern.mobile_no) setErr("Mobile No. already registered");
      else if (res.keyPattern.email) setErr("Email already registered");
    } else if (res.name !== user.name) {
      setErr(res);
    } else if (res.name === user.name) {
      setErr("");
      setSuccess("true");
      setTimeout(() => {
        setUser({
          name: "",
          mobile_no: "",
          email: "",
          address: "",
        });
        input.current.value = "";
        setSuccess("");
      }, 2000);
    }
  }

  //only redirect if token is not available or if token expires
  function handleTimeout(err) {
    setSuccess("false");
    setShowLoading(false);
  }

  //timer for redirecting to login page
  useEffect(() => {
    let interval;
    if (success === "false") {
      interval = setInterval(() => {
        if (timer > 1) {
          setTimer(timer - 1);
          console.log("object", timer);
        } else {
          clearInterval(interval);
          sessionStorage.clear();
          window.location.reload();
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [success, timer]);

  return (
    <>
      <Homepage />
      <div className="tab1__container flex__container">
        {showLoading && (
          <>
            <div className="success__background" />
            <div className="login__loader flex__container">
              <CircularProgress />
            </div>
          </>
        )}
        <div className="tab1__header">ADD USER IN DATABASE</div>
        <form
          className="add__user__form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUserAdd();
          }}
        >
          <div className="tab1__field flex__container">
            <div className="label__container ">
              <label htmlFor="name">Name :</label>
            </div>
            <input
              ref={input}
              type="text"
              id="name"
              required
              value={user.name}
              placeholder="john king"
              name="name"
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
          </div>
          <div className="tab1__field flex__container">
            <div className="label__container ">
              <label htmlFor="mobile_no">Mobile No :</label>
            </div>

            <input
              ref={input}
              type="tel"
              pattern="[0-9]{10}"
              placeholder="7603171644"
              value={user.mobile_no}
              id="mobile_no"
              required
              name="mobile_no"
              onChange={(e) => {
                setUser({ ...user, mobile_no: e.target.value });
              }}
            />
          </div>
          <div className="tab1__field flex__container">
            <div className="label__container">
              <label htmlFor="email">Email :</label>
            </div>
            <input
              ref={input}
              type="email"
              id="email"
              name="email"
              value={user.email}
              placeholder="john@gmail.com"
              required
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </div>
          <div className="tab1__field flex__container">
            <div className="label__container">
              <label htmlFor="address">Address :</label>
            </div>
            <input
              ref={input}
              type="text"
              id="address"
              name="address"
              value={user.address}
              placeholder="bardhaman"
              required
              onChange={(e) => {
                setUser({ ...user, address: e.target.value });
              }}
            />
          </div>
          <div className=" tab1__field flex__container error__container">
            {err}
          </div>
          <div className="tab1__field flex__container">
            <button className="tab1__submit__button" type="submit">
              ADD USER
            </button>
          </div>
        </form>
        {success === "true" ? (
          <>
            <div className="success__background" />
            <div
              className={`success__displayer flex__container ${
                success === "true" && "show__success__displayer"
              }`}
              style={{ animation: `${success ? "fadeIn" : "fadeOut"} 1s` }}
            >
              <img src={successImg} alt="Success" />
              <div className="success__msg">USER ADDED SUCCESSFULLY.</div>
            </div>
          </>
        ) : (
          success === "false" && (
            <>
              <div className="success__background" />
              <div
                className={`success__displayer flex__container ${
                  success === "false" && "show__success__displayer"
                }`}
                style={{ animation: `${success ? "fadeIn" : "fadeOut"} 1s` }}
              >
                <img
                  src={failureImg}
                  alt="failed"
                  style={{ height: "135px", width: "135px" }}
                />
                <div className="success__msg">SESSION TIMED OUT!</div>
                <div className="redirecting">
                  Redirecting to login page in {timer}
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
}

export default Tab1;

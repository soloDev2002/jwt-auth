import React, { useEffect, useState } from "react";
import "../pages/css/tab2.css";
import axios from "../axios";
import failedImg from "../pages/css/images/Component 2.svg";
import successImg from "../pages/css/images/Component 1.svg";
import { CircularProgress } from "@material-ui/core";

function Tab2() {
  const [data, setData] = useState();
  const [updated, setUpdated] = useState(false);
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(5);
  const [loading, setLoading] = useState(true);

  //get all user to show
  useEffect(() => {
    setLoading(true);
    const token = sessionStorage.getItem("token");

    setTimeout(fetchData, 1000);
    function fetchData() {
      axios
        .get("/post/getAllUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          sessionStorage.clear();
          window.location.reload();
        });
    }
    return () => {
      setData();
    };
  }, [updated]);

  //delete user
  async function handleUserDelete(id) {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    await axios
      .delete(`/post/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        setSuccess("true");
        setTimeout(() => {
          setSuccess();
          setUpdated(!updated);
        }, 2000);
      })
      .catch((err) => handleTimeout(err));
  }

  //only redirect if token is not available or if token expires
  function handleTimeout() {
    setLoading(false);
    setSuccess("false");
  }

  //timer for redirecting to login page
  useEffect(() => {
    let interval;
    if (success === "false") {
      interval = setInterval(() => {
        if (timer >= 1) {
          setTimer(timer - 1);
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
    <div className="tab2__container flex__container">
      <div className="tab2__header">Dashboard</div>
      {loading ? (
        <div className="loader flex__container">
          <CircularProgress />
        </div>
      ) : data?.length > 0 ? (
        <div className="dashboard__container">
          <div className="dashboard__child">
            <table className="tab2__table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Address</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((user, index) => (
                  <tr key={user.email}>
                    <td data-label="No.">{index + 1}</td>
                    <td data-label="Name">{user.name}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Mobile No.">{user.mobile_no}</td>
                    <td data-label="Address">{user.address}</td>
                    <td>
                      <button
                        className="delete__button__td"
                        onClick={() => {
                          handleUserDelete(user._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="no__user__found">NO USER FOUND !</div>
      )}
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
            <div className="success__msg">USER DELETED SUCCESSFULLY.</div>
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
                src={failedImg}
                alt="failed"
                style={{ height: "135px", width: "135px" }}
              />
              <div className="success__msg">SESSION TIMED OUT !</div>
              <div className="redirecting">
                Redirecting to login page in {timer}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default Tab2;

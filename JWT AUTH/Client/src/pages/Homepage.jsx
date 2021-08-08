import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./css/home.css";
function Homepage() {
  const selectedTab = useRef();
  return (
    <div className="homepage__container">
      <div className="homepage__header flex__container">
        <div className="header__title">HOMEPAGE</div>
        <div
          className="logout__button flex__container"
          onClick={() => {
            sessionStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </div>
      </div>
      <div className="link__container">
        <Link to="/">
          <div
            className={`tab ${selectedTab.current === "/" && "selected__link"}`}
          >
            Tab 1
          </div>
        </Link>
        <Link to="/tab2" onClick={() => (selectedTab.current = "/tab2")}>
          <div className={`tab ${selectedTab === "/tab2" && "selected__link"}`}>
            Tab 2
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;

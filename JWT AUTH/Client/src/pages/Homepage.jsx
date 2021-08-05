import React, { useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Tab1 from "../components/Tab1";
import Tab2 from "../components/Tab2";
import "./css/home.css";
function Homepage() {
  const selectedTab = useRef();
  const { path, url } = useRouteMatch();
  return (
    <div className="homepage__container">
      <Router>
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
          <Link to={`${url}`}>
            <div
              className={`tab ${
                selectedTab.current === "/" && "selected__link"
              }`}
            >
              Tab 1
            </div>
          </Link>
          <Link
            to={`${url}/tab2`}
            onClick={() => (selectedTab.current = "/tab2")}
          >
            <div
              className={`tab ${selectedTab === "/tab2" && "selected__link"}`}
            >
              Tab 2
            </div>
          </Link>
        </div>

        <Switch>
          <Route exact path={path} component={Tab1} />
          <Route path={`${path}/tab2`} component={Tab2} />
        </Switch>
      </Router>
    </div>
  );
}

export default Homepage;

import React, { createContext, useState } from "react";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Tab1 from "./components/Tab1";
import Tab2 from "./components/Tab2";

export const token_context = createContext();

function App() {
  const Token = sessionStorage.getItem("token");

  return (
    <div className="App">
      <token_context.Provider value={{ token: Token }}>
        <Router>
          <Switch>
            <Route path="/" exact>
              {Token ? <Tab1 /> : <Redirect to="/login" />}
            </Route>
            <Route path="/tab2" exact>
              {Token ? <Tab2 /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login" exact>
              {!Token ? <Login /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </Router>
      </token_context.Provider>
    </div>
  );
}

export default App;

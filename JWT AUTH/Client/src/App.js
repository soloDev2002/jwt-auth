import React, { createContext, useState, useEffect } from "react";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export const token_context = createContext();

function App() {
  const [Token, setToken] = useState();

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  return (
    <div className="App">
      <Router>
        {Token ? <Redirect to="/home" /> : <Redirect to="/login" />}
        <Switch>
          <token_context.Provider value={{ token: Token }}>
            <Route path="/home" exact component={Homepage} />
            <Route path="/login" exact render={() => <Login />} />
          </token_context.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

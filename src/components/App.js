import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Chats from "./Chats";
import Login from "./Login";
import AuthProvider from "../Providers/AuthProvider";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './static/css/style.css';
import Navigation from "./components/navigation";
import Workspace from "./containers/workspace";
import UserRole from "./containers/userrole";
import Edit from "./containers/edit";
import Others from "./containers/others";
import Login from "./containers/login";

export default function App() {
  return (
    <Router>
      <div>
        <Navigation />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/userrole">
            <UserRole />
          </Route>
          <Route path="/edit">
            <Edit />
          </Route>
          <Route path="/others">
            <Others />
          </Route>
          <Route path="/workspace">
            <Workspace />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

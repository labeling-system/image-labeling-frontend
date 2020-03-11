import React, { Component } from "react";
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

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
        isAuth: false,
    }

    this.handler = this.handler.bind(this)
  }

  handler(bool) {
    this.setState({
      isAuth: bool
    })
  }

  render() {
    return (
      <Router>
        <div id='app'>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login handler={this.handler} />
            </Route>
            <Route path="/userrole">
              <Navigation/>
              <UserRole isAuth={this.state.isAuth}/>
            </Route>
            <Route path="/edit">
              <Navigation/>
              <Edit isAuth={this.state.isAuth}/>
            </Route>
            <Route path="/others">
              <Navigation/>
              <Others isAuth={this.state.isAuth}/>
            </Route>
            <Route path="/workspace">
              <Navigation/>
              <Workspace isAuth={this.state.isAuth}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );  
  }
}

export default App;

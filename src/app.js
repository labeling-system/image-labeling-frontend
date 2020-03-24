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
import Register from "./containers/register"
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
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
            <Route exact path="/">
              <Login handler={this.handler} />
            </Route>
            <Route path="/login">
              <Login handler={this.handler} />
            </Route>
            <Route path="/register">
              <Register handler={this.handler} />
            </Route>
            <Route path="/userrole">
              <Navigation handlerNav={this.handler}/>
              <UserRole isAuth={this.state.isAuth}/>
            </Route>
            <Route path="/edit">
              <Navigation handlerNav={this.handler}/>
              <Edit isAuth={this.state.isAuth}/>
            </Route>
            <Route path="/others">
              <Navigation handlerNav={this.handler}/>
              <Others isAuth={this.state.isAuth}/>
            </Route>
            <Route path="/workspace">
              <Navigation handlerNav={this.handler}/>
              <Workspace isAuth={this.state.isAuth}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );  
  }
}

export default App;

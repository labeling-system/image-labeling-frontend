import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './static/css/style.css'
import Navigation from './components/navigation'
import Workspace from './containers/workspace'
import UserRole from './containers/userrole'
import Edit from './containers/edit'
import Others from './containers/others'
import Login from './containers/login'
import Register from './containers/register'
import 'bootstrap/dist/css/bootstrap.min.css'
import { WORKSPACE, USER, EDIT, UPLOAD, ADMIN, EDITOR } from './util/const'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuth: false,
      role: ''
    }

    this.handler = this.handler.bind(this)
    this.roleHandler = this.roleHandler.bind(this)
  }

  handler (bool) {
    this.setState({ isAuth: bool })
  }

  roleHandler (role) {
    this.setState({ role: role })
  }

  render () {
    return (
      <Router>
        <div id='app'>
          <Switch>
            <Route exact path="/">
              <Login isAuth={this.state.isAuth} handler={this.handler} roleHandler={this.roleHandler}/>
            </Route>
            <Route path="/login">
              <Login isAuth={this.state.isAuth} handler={this.handler} roleHandler={this.roleHandler}/>
            </Route>
            <Route path="/register">
              <Register isAuth={this.state.isAuth} handler={this.handler} roleHandler={this.roleHandler}/>
            </Route>
            <Route path="/userrole">
              <Navigation handlerNav={this.handler} roleHandler={this.roleHandler} role={this.state.role} page={USER}/>
              <UserRole isAuth={this.state.role === ADMIN }/>
            </Route>
            <Route path="/edit">
              <Navigation handlerNav={this.handler} roleHandler={this.roleHandler} role={this.state.role} page={EDIT}/>
              <Edit isAuth={this.state.role === ADMIN || this.state.role === EDITOR}/>
            </Route>
            <Route path="/others">
              <Navigation handlerNav={this.handler} roleHandler={this.roleHandler} role={this.state.role} page={UPLOAD}/>
              <Others isAuth={this.state.role === ADMIN }/>
            </Route>
            <Route path="/workspace">
              <Navigation handlerNav={this.handler} roleHandler={this.roleHandler} role={this.state.role} page={WORKSPACE}/>
              <Workspace isAuth={this.state.isAuth}/>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App

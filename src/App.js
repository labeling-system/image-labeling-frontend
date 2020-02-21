import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import bg from './bg.png';
import './App.css';

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.state = {isLoggedIn: true, message: 'Welcome', bgColor: '#FF7D7D'};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true, message: 'Welcome', bgColor: '#FF7D7D'});
  }

  handleSignUpClick() {
    this.setState({isLoggedIn: false, message: 'Sign Up', bgColor: 'white '});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const message = this.state.message;
    const bgColor = this.state.bgColor;
    let button;

    if (isLoggedIn) {
      button = <SignUpButton onClick={this.handleSignUpClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div id='welcome-container' class="col-sm-8" style={{backgroundColor:bgColor}}>
            <img id='bg' src={bg} />
          </div>
          <div id='form-container' class="col-sm-4">
              <p id='___'>___</p>
            <p id='welcome'>{message}</p>
            <form action="">
              <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </form>
          </div>
        </div>
      </div>

    );
  }
}

function LoginGreeting(props) {
  return [
    <div>
      <div class="form-group">
        <label class="form-label" for="username">Username</label>
        <input type="username" class="form-control" id="username" name="username"/>
      </div>
      <div class="form-group">
        <label class="form-label" for="pwd">Password</label>
        <input type="password" class="form-control" id="pwd" name="pwd"/>
      </div>	
      <button id='submit' type="submit" class="btn btn-default">Login</button>
    </div>  
  ]
}

function SignUpGreeting(props) {
  return [
    <div>
      <div class="form-group">
        <label class="form-label" for="username">Username</label>
        <input type="username" class="form-control" id="username" name="username"/>
      </div>
      <div class="form-group">
        <label class="form-label" for="email">Email</label>
        <input type="email" class="form-control" id="email" name="email"/>
      </div>
      <div class="form-group">
        <label class="form-label" for="pwd">Password</label>
        <input type="password" class="form-control" id="pwd" name="pwd"/>
      </div>	
      <button id='submit' type="submit" class="btn btn-default">Sign Up</button>
    </div>  
  ]
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <LoginGreeting />;
  }
  return <SignUpGreeting />;
}

function LoginButton(props) {
  return (
    <p class='register'>Already have an account?
      <button onClick={props.onClick} id='log-in' type="button" class="btn btn-default">Login</button>
    </p>
  );
}

function SignUpButton(props) {
  return (
    <p class='register'>Don't have an account?
      <button onClick={props.onClick} id='sign-up' type="button" class="btn btn-default">Sign Up</button>
    </p>
  );
}

export default LoginControl;
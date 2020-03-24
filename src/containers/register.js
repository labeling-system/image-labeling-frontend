import React from 'react';
import bg from '../static/img/bg.png';
import { loginAuth, userRegister } from '../api/auth';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            inLogin: true,
            redirect: false,
            message: 'Welcome',
            bgColor: '#FF7D7D',
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/workspace' />
        }
    }

    async onSubmit() {
        if (this.state.inLogin == true) {
            try {
                let username = this.state.username;
                let password = this.state.password;
                // let result = await loginAuth(username, password);
                // if(result.status == 200) {
                    this.props.handler(true);
                    this.state.redirect = true;
                // } 
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                let username = this.state.username;
                let password = this.state.password;
                let result = await userRegister(username, password);
                if(result.status == 200) {
                    alert("Succesfully Registered");
                } 
            } catch (err) {
                console.log(err);
            }
        }
    }
        

    handleLoginClick() {
        this.setState({
            inLogin: true,
            message: 'Welcome',
            bgColor: '#FF7D7D'
        });
    }

    handleSignUpClick() {
        this.setState({
            inLogin: false,
            message: 'Sign Up',
            bgColor: 'white '
        });
    }

    render() {
        const inLogin = this.state.inLogin;
        const message = this.state.message;
        const bgColor = this.state.bgColor;
        let button;

        if (inLogin) {
            button = <SignUpButton onClick={this.handleSignUpClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div id="login">
                <div className="login-content">
                    <h4 className="login-content-title">Register</h4>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <h6>Username</h6>
                            <Form.Control type="email" placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <h6>Password</h6>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <p className="login-content-register">Don't have account? <a>Register</a> here.</p>
                        <Button variant="primary" type="submit" block>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
            // <div className="container-fluid">
            //     {this.renderRedirect()}
            //     <div className="row">
            //         <div id='welcome-container' className="col-sm-8" style={{ backgroundColor: bgColor }}>
            //             <img id='bg' src={bg} alt='background' />
            //         </div>
            //         <div id='form-container' className="col-sm-4">
            //             <p id='___'>___</p>
            //             <p id='welcome'>{message}</p>
            //                 <Greeting inLogin={inLogin} onSubmit={this.onSubmit} handleChange={this.handleChange}/>
            //                 {button}
            //         </div>
            //     </div>
            // </div>

        );
    }
}

function LoginGreeting(props) {
    const username = props.username;
    const password = props.password;
    return [
        <div>
            <div className="form-group">
                <label className="form-label" htmlFor="username">Username</label>
                <input type="username" className="form-control" id="username" name="username" value={username} onChange={props.handleChange} />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="pwd">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={password} onChange={props.handleChange} />
            </div>
            <button id='submit' type="submit" className="btn btn-default" onClick={props.onSubmit}>Login</button>
        </div>
    ]
}

function SignUpGreeting(props) {
    const username = props.username;
    const password = props.password;
    return [
        <div>
            <div className="form-group">
                <label className="form-label" htmlFor="username">Username</label>
                <input type="username" className="form-control" id="username" name="username" value={username} onChange={props.handleChange} />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="pwd">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={password} onChange={props.handleChange} />
            </div>
            <button id='submit' type="submit" className="btn btn-default" onClick={props.onSubmit}>Sign Up</button>
        </div>
    ]
}

function Greeting(props) {
    const inLogin = props.inLogin;
    if (inLogin) {
        return <LoginGreeting onSubmit={props.onSubmit} handleChange={props.handleChange}/>;
    } else {
        return <SignUpGreeting onSubmit={props.onSubmit} handleChange={props.handleChange}/>;
    }
}

function LoginButton(props) {
    return (
        <p className='register'>Already have an account?
        <button onClick={props.onClick} id='log-in' type="button" className="btn btn-default">Login</button>
        </p>
    );
}

function SignUpButton(props) {
    return (
        <p className='register'>Don't have an account?
        <button onClick={props.onClick} id='sign-up' type="button" className="btn btn-default">Sign Up</button>
        </p>
    );
}

export default Register;
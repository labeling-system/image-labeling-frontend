import React from 'react';
import { loginAuth } from '../api/auth';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setAPI } from '../config';

class Login extends React.Component {
    constructor(props) {
        setAPI(window.location.href)
        super(props);
        this.state = {
            redirect: false,
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    async handleSubmit(e){
        e.preventDefault();
        try {
            let username = this.state.username;
            let password = this.state.password;
            let result = await loginAuth(username, password);
            if(result.status === 200) {
                this.props.handler(true);
                this.props.roleHandler(result.data.role)
            } 
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        console.log("login : " + this.props.isAuth)

        return this.props.isAuth ? <Redirect to='/workspace'/> :(
            <div id="login">
                <div className="login-content">
                    <h4 className="login-content-title">Login</h4>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicText">
                            <h6>Username</h6>
                            <Form.Control type="text" name="username" placeholder="Enter username" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <h6>Password</h6>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                        </Form.Group>
                        <p className="login-content-register">Don't have account? <a href="/register">Register</a> here.</p>
                        <Button variant="primary" type="submit" block>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
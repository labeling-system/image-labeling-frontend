import React from 'react';
import { userRegister } from '../api/auth';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Register extends React.Component {
    constructor(props) {
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

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/workspace' />
        }
    }

    async handleSubmit(e){
        e.preventDefault();
        try {
            let username = this.state.username;
            let password = this.state.password;
            let result = await userRegister(username, password);
            if(result.status === 200) {
                this.props.handler(true);
                this.setState({ redirect: true });
            } 
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div id="register">
                {this.renderRedirect()}
                <div className="register-content">
                    <h4 className="register-content-title">Register</h4>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicText">
                            <h6>Username</h6>
                            <Form.Control type="text" name="username" placeholder="Enter username" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <h6>Password</h6>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                        </Form.Group>
                        <p className="register-content-register">Already have account? <a href="/login">Login</a> here.</p>
                        <Button variant="outline-primary" type="submit" block>
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Register;
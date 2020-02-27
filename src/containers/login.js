import React from 'react';
import bg from '../static/img/bg.png';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            isLoggedIn: true,
            message: 'Welcome',
            bgColor: '#FF7D7D',
            username: '',
            email: '',
            password: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit() {
        fetch('http://google.com', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'abc@abc.com',
                password: '123456',
            })
        })
            .then((response => {
                console.log(response);
            }))
            .catch((err) => {
                console.log(err);
            })
    }

    handleLoginClick() {
        this.setState({
            isLoggedIn: true,
            message: 'Welcome',
            bgColor: '#FF7D7D'
        });
    }

    handleSignUpClick() {
        this.setState({
            isLoggedIn: false,
            message: 'Sign Up',
            bgColor: 'white '
        });
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
                    <div id='welcome-container' className="col-sm-8" style={{ backgroundColor: bgColor }}>
                        <img id='bg' src={bg} alt='background' />
                    </div>
                    <div id='form-container' className="col-sm-4">
                        <p id='___'>___</p>
                        <p id='welcome'>{message}</p>
                        <form onSubmit={this.onSubmit}>
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
    const email = props.email;
    return [
        <div>
            <div className="form-group">
                <label className="form-label" htmlFor="username">Username</label>
                <input type="username" className="form-control" id="username" name="username" value={username} onChange={props.handleChange} />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={email} onChange={props.handleChange} />
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
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <LoginGreeting />;
    }
    return <SignUpGreeting />;
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

export default Login;
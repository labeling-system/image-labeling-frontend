import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workspace: true,
            userrole: false,
            edit: false,
            others: false

        }
        this.onLogout = this.onLogout.bind(this)
    }

    handleChange = (e) => {
        const activeElement = document.getElementsByClassName('active');
        console.log(activeElement[0].name);
        if (activeElement[0].name !== e.target.name) {
            this.setState(
                { [activeElement[0].name]: !this.state[activeElement[0].name] }
            )
            this.setState(
                { [e.target.name]: !this.state[e.target.name] }
            )
        }
        console.log(this.state[e.target.name]);
    }

    onLogout() {
        this.props.handlerNav(false);
    }

    render() {
        return (
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to="/workspace"
                            className={this.state.workspace ? 'active' : null}
                            name="workspace" onClick={this.handleChange}>
                            Workspace
                    </Link>
                    </li>
                    <li>
                        <Link to="/userrole"
                            className={this.state.userrole ? 'active' : null}
                            name="userrole" onClick={this.handleChange}>
                            User Role
                    </Link>
                    </li>
                    <li>
                        <Link to="/edit"
                            className={this.state.edit ? 'active' : null}
                            name="edit" onClick={this.handleChange}>
                            Edit
                    </Link>
                    </li>
                    <li>
                        <Link to="/others"
                            className={this.state.others ? 'active' : null}
                            name="others" onClick={this.handleChange}>
                            Others
                    </Link>
                    </li>
                    <li>
                        <Link to="/login" onClick={this.onLogout}>
                            Logout
                    </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navigation;
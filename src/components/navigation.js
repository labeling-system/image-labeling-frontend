import React, { Component } from 'react';
import {Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { WORKSPACE, USER, EDIT, UPLOAD } from "../util/const";

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this)
    }

    onLogout() {
        this.props.handlerNav(false);
    }

    render() {
        return (
            <div className="navigation">
                <div className="navigation-wrapper">
                    <div className="navigation-link">
                        <Link to="/workspace" className={this.props.page === WORKSPACE ? 'active' : null}>
                            Workspace
                        </Link>
                        <Link to="/userrole" className={this.props.page === USER ? 'active' : null}>
                            User
                        </Link>
                        <Link to="/edit" className={this.props.page === EDIT ? 'active' : null}>
                            Edit
                        </Link>
                        <Link to="/others" className={this.props.page === UPLOAD ? 'active' : null}>
                            Upload
                        </Link>
                    </div>
                    <div className="navigation-button">
                        <Button variant="outline-info" onClick={this.onLogout}>Logout</Button>  
                    </div>
                </div>
            </div>
        )
    }
}

export default Navigation;
import React, { Component } from 'react';
import {Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { WORKSPACE, USER, EDIT, UPLOAD, ADMIN, EDITOR } from "../util/const";

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this)
    }

    onLogout() {
        this.props.handlerNav(false);
        this.props.roleHandler('');
    }

    render() {
        return (
            <div id='navigation' className="parent-wrapper">
                <div className="navigation-wrapper wrapper">
                    <div className="navigation-link">
                        <Link to="/workspace" className={this.props.page === WORKSPACE ? 'active' : null}>
                            Workspace
                        </Link>
                        {
                            this.props.role === ADMIN ?
                            <Link to="/userrole" className={this.props.page === USER ? 'active' : null}>
                                User
                            </Link>
                            : null
                        }
                        {
                            this.props.role === ADMIN || this.props.role === EDITOR  ?
                            <Link to="/edit" className={this.props.page === EDIT ? 'active' : null}>
                                Edit
                            </Link>
                            : null
                        }
                        {
                            this.props.role === ADMIN ?
                            <Link to="/others" className={this.props.page === UPLOAD ? 'active' : null}>
                                Upload
                            </Link>
                            : null
                        }
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
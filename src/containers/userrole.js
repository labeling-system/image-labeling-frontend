import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


export class UserRole extends Component{
    render(){
        return !this.props.isAuth ? <Redirect to='/login'/> : (
            <h2>UserRole</h2>
        )
    }
}

export default UserRole;
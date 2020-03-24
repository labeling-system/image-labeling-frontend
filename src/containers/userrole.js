import React, { Component } from 'react';
import { getAllUsers, postUser } from '../api/user';
import { Redirect } from 'react-router-dom';


const ID = 0;
const ROLE = 2;
const NAME = 1;

class UserRole extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: '',
            redirect: false
        };
        this.handleGetAllUsers = this.handleGetAllUsers.bind(this);
    }

    async handleGetAllUsers() {
        try {
            let result = await getAllUsers();
            this.setState({ users: result.data.users });
            this.setState({ error: '' });
        } catch (err) {
            console.log(err);
            this.setState({ error: 'Error, please contact the administrator' });
        }
    }
    
    async componentDidMount() {
        console.log('sekar')
        try {
            let result = await getAllUsers();
            console.log(result.data.users)
            this.setState({ users: result.data.users });
            this.setState({ error: '' });
        } catch (err) {
            console.log(err);
            this.setState({ error: 'Error, please contact the administrator' });
        }
    }

    render(){
        return !this.props.isAuth ? <Redirect to='/login'/> : (
            <div id='userrole'>
                <h2>Users</h2>
                <table className="table-label">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((user, i) => (
                                <tr id={'user-' + user[ID]} key={i}>
                                    <td>{i + 1}</td>
                                    <td>{user[NAME]}</td>
                                    <td>
                                        <div className="dropdown">
                                            <button className="dropbtn">{user[ROLE]}</button>
                                            <div className="dropdown-content">
                                                <button href="" onClick={() => this.onUpdateRole(user[ID], 'admin')}>admin</button>
                                                <button href="" onClick={() => this.onUpdateRole(user[ID], 'labeller')}>labeller</button>
                                                <button href="" onClick={() => this.onUpdateRole(user[ID], 'editor')}>editor</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        )
    }

    async onUpdateRole (i, r) {
        console.log('sekar')
        try {
            let result = await postUser(i, r);
            console.log(result)
            this.handleGetAllUsers();
        } catch (err) {
            console.log(err);
            this.setState({ error: 'Error, please contact the administrator' })
        }
        console.log(this.state.users)
    }
}

export default UserRole;
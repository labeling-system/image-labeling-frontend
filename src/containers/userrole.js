import React, { Component } from 'react'
import { getAllUsers, postUser } from '../api/user'
import { Redirect } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { ADMIN, EDITOR, LABELER } from '../util/const'

const ID = 0
const ROLE = 2
const NAME = 1

class UserRole extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      error: '',
      redirect: false
    }
    this.handleGetAllUsers = this.handleGetAllUsers.bind(this)
  }

  async handleGetAllUsers () {
    try {
      const result = await getAllUsers()
      this.setState({ users: result.data.users })
      this.setState({ error: '' })
    } catch (err) {
      console.log(err)
      this.setState({ error: 'Error, please contact the administrator' })
    }
  }

  async componentDidMount () {
    console.log('sekar')
    try {
      const result = await getAllUsers()
      console.log(result.data.users)
      this.setState({ users: result.data.users })
      this.setState({ error: '' })
    } catch (err) {
      console.log(err)
      this.setState({ error: 'Error, please contact the administrator' })
    }
  }

  render () {
    return !this.props.isAuth ? <Redirect to='/login'/> : (
      <div id='userrole' className='parent-wrapper'>
        <div className='wrapper'>
          <h2 className='page-title'>User Management</h2>
          <Table striped bordered hover>
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
                      <DropdownButton title={user[ROLE]}>
                        {
                          user[ROLE] !== ADMIN && <Dropdown.Item as="button" onClick={() => this.onUpdateRole(user[ID], ADMIN)}>{ADMIN}</Dropdown.Item>
                        }
                        {
                          user[ROLE] !== LABELER && <Dropdown.Item as="button" onClick={() => this.onUpdateRole(user[ID], LABELER)}>{LABELER}</Dropdown.Item>
                        }
                        {
                          user[ROLE] !== EDITOR && <Dropdown.Item as="button" onClick={() => this.onUpdateRole(user[ID], EDITOR)}>{EDITOR}</Dropdown.Item>
                        }
                      </DropdownButton>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    )
  }

  async onUpdateRole (i, r) {
    console.log('sekar')
    try {
      const result = await postUser(i, r)
      console.log(result)
      this.handleGetAllUsers()
    } catch (err) {
      console.log(err)
      this.setState({ error: 'Error, please contact the administrator' })
    }
    console.log(this.state.users)
  }
}

export default UserRole

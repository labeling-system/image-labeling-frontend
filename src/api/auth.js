import axios from 'axios'
import { API } from '../config'

export const loginAuth = (username, password) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: API + '/login',
      data: {
        username: username,
        password: password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const userRegister = (username, password) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: API + '/register',
      data: {
        username: username,
        password: password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

import axios from 'axios'
import { API } from '../config'

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: API + '/userrole'
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const postUser = (id, role) => {
  console.log('postUser')
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: API + '/userrole',
      data: {
        id: id,
        role: role
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

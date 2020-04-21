import axios from 'axios'
import { API } from '../config'

export const getMostUsedLabels = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: API + '/label',
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

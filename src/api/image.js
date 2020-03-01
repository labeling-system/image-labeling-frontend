import axios from 'axios';
import { API } from '../config';

export const postImage = (filenames) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: API + '/image',
            data: {
                "filenames": filenames,
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

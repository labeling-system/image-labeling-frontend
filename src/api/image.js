import axios from 'axios';
import { API } from '../config';

export const postImage = (files) => {
    console.log(files)
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: API + '/image',
            data: {
                "files": files,
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

export const getAllImages = (page) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: API + '/image/all/' + page
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

export const deleteAllImages = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: API + '/image/all'
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

export const pingImage = (id) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: API + '/image/ping/' + id
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

export const getAllLabeled = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: API + '/download'
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

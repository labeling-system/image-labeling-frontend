import axios from 'axios';
import { API } from '../config';

export const getWorkingImage = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: API + '/selection',
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

export const saveImage = (image_id) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: API + '/selection/next/' + image_id,
            data: {
                "image_id": image_id,
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

export const getSelectionImage = (image_id) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: API + '/selection/' + image_id,
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};
export var API = 'http://localhost:5000';
export var BASE_URL = 'http://localhost';

export const setAPI = (newAPI) => {
    let temp = newAPI.split('/')[2].split(':')[0];
    BASE_URL = temp;
    temp = 'http://' + temp + ':5000';
    API = temp;
    console.log(API);
}
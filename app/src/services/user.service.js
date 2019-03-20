import { authHeader } from '../helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    getAll
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { email, password }
    };
    return axios.post('http://localhost:8080/auth/login', {email, password})
        .then(res => {
            console.log('result', res)
            console.log('data', res.data)
              if (res.status === 200){
                localStorage.setItem('user', JSON.stringify(res));

                return res;
            }  
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getAll() {
  /*   const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`localhost:8080/users`, requestOptions).then(handleResponse); */
}
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
    return axios.post('http://localhost:8080/auth/login', {email, password})/* fetch('http://localhost:8080/auth/login', requestOptions) */
       // .then(handleResponse)
        .then(res => {
            console.log('result', res)
            console.log('data', res.data)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
             if (res.status === 200){
                localStorage.setItem('user', JSON.stringify(res));

                return res;
            } 
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
  /*   const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`localhost:8080/users`, requestOptions).then(handleResponse); */
}

/* function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
             //   location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
} */
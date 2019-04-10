import axios from 'axios';
import graphqlQueries from './graphqlQueries';
import { toastr } from 'react-redux-toastr';

export default {
  createFilm,
  fetchFilms,
  deleteFilm,
  editFilm,
  validateUser,
  registerUser,
  login,
  logout,
  fetchFilm
};



const handleResponse = (response) => { 
  console.log('response', response)
  if (response.errors) {
    const message = response.errors[0].message;
    toastr.error(`${message}`);
    throw new Error(message);
  }
  return response.data;
};

const handleError = (err) => {
  console.log('err', err);
  toastr.error(`${err}`);
  return Promise.reject(err);
};

async function createFilm(data) {
  const requestBody = {
    query: graphqlQueries.CREATE_FILM,
    variables: {
      name: data.name,
      description: data.description,
      director: data.director,
    }
  };
  return fetch('http://localhost:8080/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      console.log("create res", res)
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function fetchFilms() {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  let requestBody = {
    query: graphqlQueries.FETCH_FILMS
  };
  return fetch('http://localhost:8080/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then((res) => {
      console.log('res', res);
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function fetchFilm(id) {
  let requestBody = {
    query: graphqlQueries.FETCH_FILM,
    variables: {
      id: id
    }
  };
  return fetch('http://localhost:8080/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      console.log('res', res);
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function deleteFilm(id) {
  console.log(id);
  const requestBody = {
    query: graphqlQueries.DELETE_FILM,
    variables: {
      id: id
    }
  };
  return fetch('http://localhost:8080/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function editFilm(id,data) {
  const requestBody = {
    query: graphqlQueries.UPDATE_FILM,
    variables: {
      id,
     ...data
    }
  };
  return fetch('http://localhost:8080/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function login(data) {
  let requestBody = {
    query: graphqlQueries.LOGIN,
    variables: {
      email: data.email,
      password: data.password
    }
  };
  return fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function logout() {
  let requestBody = {
    query: graphqlQueries.LOGOUT
  };
  return fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function registerUser(data) {
  const requestBody = {
    query: graphqlQueries.CREATE_USER,
    variables: {
      email: data.email,
      password: data.password
    }
  };

  return fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function validateUser(email) {
  return axios
    .post('/validate', {email})
    .then(handleResponse)
    .catch(handleError);
}

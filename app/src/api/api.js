import axios from 'axios';
import graphqlQueries from './graphqlQueries';
import { toastr } from 'react-redux-toastr';

export default {
  createFilm,
  fetchFilms,
  deleteFilm,
  editFilm,
  fetchFilm,
  createCinema,
  fetchCinemas,
  deleteCinema,
  editCinema,
  fetchCinema,
  createSession,
  fetchSessions,
  deleteSession,
  editSession,
  fetchSession,
  fetchSessionOptions
/*   validateUser,
  registerUser,
  login,
  logout, */
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
  console.log(err);
  return Promise.reject(err);
};

async function createFilm(data) {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
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
      'Content-Type': 'application/json',
      'Authorization': token
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
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
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

function deleteFilm(id) {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
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
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then((res) => {
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function editFilm(id,data) {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
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
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then((res) => {
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

//CINEMA



async function createCinema(data) {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  const requestBody = {
    query: graphqlQueries.CREATE_CINEMA,
    variables: {
      name: data.name,
      phone: data.phone,
      address: data.address,
    }
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
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function fetchCinemas() {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  let requestBody = {
    query: graphqlQueries.FETCH_CINEMAS
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

function fetchCinema(id) {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  let requestBody = {
    query: graphqlQueries.FETCH_CINEMA,
    variables: {
      id: id
    }
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

function deleteCinema(id) {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  console.log(id);
  const requestBody = {
    query: graphqlQueries.DELETE_CINEMA,
    variables: {
      id: id
    }
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
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function editCinema(id,data) {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  const requestBody = {
    query: graphqlQueries.UPDATE_CINEMA,
    variables: {
      id,
     ...data
    }
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
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}



//SESSIONS

async function createSession(data) {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  const requestBody = {
    query: graphqlQueries.CREATE_SESSION,
    variables: {
      date: data.date,
      Film_Id: data.Film_Id,
      Cinema_Id: data.Cinema_Id,
    }
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
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function fetchSessions() {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  let requestBody = {
    query: graphqlQueries.FETCH_SESSIONS
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

function fetchSession(id) {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  let requestBody = {
    query: graphqlQueries.FETCH_SESSION,
    variables: {
      id: id
    }
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

function deleteSession(id) {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  console.log(id);
  const requestBody = {
    query: graphqlQueries.DELETE_SESSION,
    variables: {
      id: id
    }
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
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function editSession(id,data) {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  const requestBody = {
    query: graphqlQueries.UPDATE_SESSION,
    variables: {
      id,
     ...data
    }
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
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

function fetchSessionOptions() {
  let token = JSON.parse(window.localStorage.getItem('user')).data.token;
  const requestBody = {
    query: graphqlQueries.FETCH_OPTIONS,
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
      console.log('res', res)
      return res.json();
    })
    .then(handleResponse)
    .catch(handleError);
}

/* function login(data) {
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
 */
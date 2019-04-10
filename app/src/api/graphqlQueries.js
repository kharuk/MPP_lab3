export default {
  CREATE_FILM: `
    mutation CreateFilm($name: String!, $description: String!, $director: String!) {
      createFilm(filmInput: {name: $name, description: $description, director: $director}) {
        id
        name
        description
        director 
      }
    }
  `,
  FETCH_FILMS: `
   query {
     getFilms {   
       id
       name
       description
       director
      }     
   }
   `,
  FETCH_FILM: `
  mutation ShowFilm($id: ID!) {
    showFilm(id: $id) {
      id
      name
      description
      director
    }
  }
   `,
  DELETE_FILM: `
   mutation DeleteFilm($id: ID!) {
     deleteFilm(id: $id) {
       id   
     }
   }
 `,
  UPDATE_FILM: `
    mutation UpdateFilm($id: ID!, $name: String!, $description: String!, $director: String!) {
    updateFilm(id: $id, name: $name, description: $description, director: $director) {
      id
      name
      description
      director
   }
 }
`,
  LOGIN: `
query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    userId
  }
}
`,
  LOGOUT: `
query Logout {
  logout 
}
`,
  CREATE_USER: `
mutation CreateUser($email: String!, $password: String!) {
  createUser(userInput: {email: $email, password: $password}) {
    _id     
  }
}
`
};

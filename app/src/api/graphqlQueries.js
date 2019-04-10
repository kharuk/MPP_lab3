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
CREATE_CINEMA: `
    mutation CreateCinema($name: String!, $phone: String!, $address: String!) {
      createCinema(cinemaInput: {name: $name, phone: $phone, address: $address}) {
        id
        name
        phone
        address 
      }
    }
  `,
  FETCH_CINEMAS: `
   query {
     getCinemas {   
      id
      name
      phone
      address 
      }     
   }
   `,
  FETCH_CINEMA: `
  mutation ShowCinema($id: ID!) {
    showCinema(id: $id) {
      id
      name
      phone
      address 
    }
  }
   `,
  DELETE_CINEMA: `
   mutation DeleteCienma($id: ID!) {
     deleteCinema(id: $id) {
       id   
     }
   }
 `,
  UPDATE_CINEMA: `
    mutation UpdateCinema($id: ID!, $name: String!, $phone: String!, $address: String!) {
    updateCinema(id: $id, name: $name, phone: $phone, address: $address) {
      id
      name
      phone
      address 
   }
 }
`,
  CREATE_SESSION: `
      mutation CreateSession($date: String!, $Film_Id: Int!, $Cinema_Id: Int!) {
        createSession(sessionInput: {date: $date, Film_Id: $Film_Id, Cinema_Id: $Cinema_Id}) {
          id
          date
          Film_Id
          Cinema_Id 
        }
      }
    `,
    FETCH_SESSIONS: `
    query {
      getSessions {   
        id
        date
        Film_Id
        Cinema_Id 
        }     
    }
    `,
    FETCH_OPTIONS: `
    query {
      getOptions {   
        films {
          id
          name
          description
          director 
        }
        cinemas {
          id
          name
          phone
          address 
        }
        }     
    }
    `,
    FETCH_SESSION: `
    mutation ShowSession($id: ID!) {
      showSession(id: $id) {
        films {
          id
          name
          description
          director 
        }
        cinemas {
          id
          name
          phone
          address 
        }
        session {
          id
          date
          Film_Id
          Cinema_Id 
        }

      }
    }
    `,
    DELETE_SESSION: `
    mutation DeleteSession($id: ID!) {
      deleteSession(id: $id) {
        id   
      }
    }
  `,
    UPDATE_SESSION: `
      mutation UpdateSession($id: ID!, $date: String!, $Film_Id: Int!, $Cinema_Id: Int!) {
      updateSession(id: $id, date: $date, Film_Id: $Film_Id, Cinema_Id: $Cinema_Id) {
        id
        date
        Film_Id
        Cinema_Id 
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

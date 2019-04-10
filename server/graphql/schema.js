const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Film {
  id: Int
  name: String
  description: String
  director: String
}
type Cinema {
  id: Int
  name: String
  phone: String
  address: String
}
type Session {
  id: Int
  Film_Id: Int
  Cinema_Id: Int
  date: String
}
type SessionInfoExtra {
  films: [Film]
  cinemas: [Cinema]
  session: Session
}
type SessionInfo {
  films: [Film]
  cinemas: [Cinema]
}
type User {
  _id: ID!
  email: String!
  password: String
}
type AuthData {
  userId: ID!
}
input FilmInput {
  name: String!
  description: String!
  director: String!
}
input CinemaInput {
  name: String!
  phone: String!
  address: String!
}
input SessionInput {
  date: String!
  Film_Id: Int!
  Cinema_Id: Int!
}
input UserInput {
  email: String!
  password: String!
}
input UpdateFilmInput {
  name: String!
  description: String!
  director: String!
}
type RootQuery {
  getFilms: [Film!]!
  getCinemas: [Cinema!]!
  getSessions: [Session!]!
  getOptions: SessionInfo!
  login(email: String!, password: String!): AuthData!
  logout: Boolean
}
type RootMutation {
  createFilm(filmInput: FilmInput): Film
  showFilm(id: ID!): Film
  updateFilm(id: ID!, name: String, description: String, director: String): Film
  deleteFilm(id: ID!): Film
  createCinema(cinemaInput: CinemaInput): Cinema
  showCinema(id: ID!): Cinema
  updateCinema(id: ID!, name: String, phone: String, address: String): Cinema
  deleteCinema(id: ID!): Cinema
  createUser(userInput: UserInput): User,
  createSession(sessionInput: SessionInput): Session
  showSession(id: ID!): SessionInfoExtra!
  updateSession(id: ID!, date: String, Film_Id: Int, Cinema_Id: Int): Session
  deleteSession(id: ID!): Session
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);

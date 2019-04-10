const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Film {
  id: Int
  name: String
  description: String
  director: String
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
  login(email: String!, password: String!): AuthData!
  logout: Boolean
}
type RootMutation {
  createFilm(filmInput: FilmInput): Film
  showFilm(id: ID!): Film
  updateFilm(id: ID!, name: String, description: String, director: String): Film
  deleteFilm(id: ID!): Film
  createUser(userInput: UserInput): User

}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);

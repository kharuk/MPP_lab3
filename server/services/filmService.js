const Film  = require('../models/film');
const VerifyToken = require('../middleware/verifyToken');
const {ApolloError} = require('apollo-server');

async function getFilms(data,context) {
  VerifyToken(context);
  try {
    const films = await Film.findAll();
    return films;
  } catch (err) {
    throw new ApolloError(err);
  }
}

async function createFilm(args,context) {
  VerifyToken(context);
 console.log(args)
  try {
    const result = await Film.create(args.filmInput)
    console.log('result', result.dataValues);
    return result.dataValues;
  } catch (err) {
    console.log(err);
    throw new ApolloError(err);
  }
}

async function showFilm({id},context) {
  //VerifyToken(context);
  try {
    const film = await Film.findById(id);
    return film;
  }
  catch (err) {
    throw new ApolloError(err);
  }
}

async function updateFilm(args,context) {
 // VerifyToken(context);
 console.log(args);
  const {id, ...data} = args;
  try {
    const film = await Film.update(data, {where: { id: id }});
    console.log('result', film.dataValues);
    return film.dataValues;
  } catch (err) {
    console.log(err);
    throw new ApolloError(err);
  }
}

async function deleteFilm({id},context) {
  //VerifyToken(context);
  try {
    const film = await Film.destroy({where: {id: id}});
    console.log(film)
    return {id : film.id};
  }
  catch (err) {
    throw new ApolloError(err);
  }
}

module.exports = {
  getFilms,
  createFilm,
  showFilm,
  updateFilm,
  deleteFilm
};

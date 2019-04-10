const Cinema  = require('../models/cinema');
const VerifyToken = require('../middleware/verifyToken');
const {ApolloError} = require('apollo-server');

async function getCinemas(data,context) {
  VerifyToken(context);
  try {
    const cinemas = await Cinema.findAll();
    return cinemas;
  } catch (err) {
    throw new ApolloError(err);
  }
}

async function createCinema(args,context) {
  VerifyToken(context);
 console.log(args)
  try {
    const result = await Cinema.create(args.cinemaInput)
    console.log('result', result.dataValues);
    return result.dataValues;
  } catch (err) {
    console.log(err);
    throw new ApolloError(err);
  }
}

async function showCinema({id},context) {
  VerifyToken(context);
  try {
    const cinema = await Cinema.findById(id);
    return cinema;
  }
  catch (err) {
    throw new ApolloError(err);
  } 
}

async function updateCinema(args,context) {
  VerifyToken(context);
 console.log(args);
  const {id, ...data} = args;
  try {
    const cinema = await Cinema.update(data, {where: { id: id }});
    console.log('result', cinema.dataValues);
    return cinema.dataValues;
  } catch (err) {
    console.log(err);
    throw new ApolloError(err);
  }
}

async function deleteCinema({id},context) {
  VerifyToken(context);
  try {
    const cinema = await Cinema.destroy({where: {id: id}});
    return {id : cinema.id};
  }
  catch (err) {
    throw new ApolloError(err);
  }
}

module.exports = {
  getCinemas,
  createCinema,
  showCinema,
  updateCinema,
  deleteCinema
};

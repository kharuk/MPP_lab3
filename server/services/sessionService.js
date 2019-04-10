const Film  = require('../models/film');
const Cinema = require('../models/cinema');
const Session  = require('../models/session');
const VerifyToken = require('../middleware/verifyToken');
const {ApolloError} = require('apollo-server');

async function getSessions(data,context) {
  VerifyToken(context);
  try {
    const sessions = await Session.findAll();
    return sessions;
  } catch (err) {
    throw new ApolloError(err);
  }
}

async function getOptions(data,context) {
  VerifyToken(context);
  try {
    const films = await Film.findAll();
    const cinemas = await Cinema.findAll();
    let data = {
      films: films, 
      cinemas: cinemas
    }
    //console.log('date',data);
    return data;
  }
  catch (err) {
    throw new ApolloError(err);
  } 
}

async function createSession(args,context) {
  VerifyToken(context);
  console.log(args)
   try {
     const result = await Session.create(args.sessionInput)
     console.log('result', result.dataValues);
     return result.dataValues;
   } catch (err) {
     console.log(err);
     throw new ApolloError(err);
   }
}

async function showSession({id},context) {
  VerifyToken(context);
  try {
    const session = await Session.findById(id);
    const films = await Film.findAll();
    const cinemas = await Cinema.findAll();
    let data = {
      films: films, 
      cinemas: cinemas, 
      session: session.dataValues
    }
    console.log(data);
    return data;
  }
  catch (err) {
    console.log(err);
    throw new ApolloError(err);
  }
}

async function updateSession(args,context) {
  VerifyToken(context);
  console.log(args);
   const {id, ...data} = args;
   console.log(data)
   try {
     const session = await Session.update(data, {where: { id: id }});
     console.log('result', session.dataValues);
     return session.dataValues;
   } catch (err) {
     console.log(err);
     throw new ApolloError(err);
   }
}

async function deleteSession({id},context) {
  VerifyToken(context);
  try {
    const session = await Session.destroy({where: {id: id}});
    return {id : session.id};
  }
  catch (err) {
    throw new ApolloError(err);
  }
}


module.exports = {
  getSessions,
  getOptions,
  createSession,
  showSession,
  updateSession,
  deleteSession
};

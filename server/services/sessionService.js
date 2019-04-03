const Film  = require('../models/film');
const Cinema = require('../models/cinema');
const Session  = require('../models/session');

function getSessions(socket) {
  Session.findAll()
  .then(sessions => {
    console.log("session recived");
    socket.emit('session recived',sessions);
    socket.broadcast.emit('session recived',sessions);
  })
  .catch(err => console.log(err));
}

function addNewSession(socket) {
  Film.findAll()
  .then(films => {
    Cinema.findAll()
    .then(cinemas => {
      let date = {
        films: films,
        cinemas: cinemas
      }
      console.log("options recived");
      socket.emit('options recived',date);
      socket.broadcast.emit('options recived',date);
    })
  })
  .catch(err => console.log(err));
  
}

function createSession(session,socket) {
  Session.create(session)
  .then((session) => {
    console.log("session created");
  })
  .catch(err => console.log(err));
}

function showSession(id, socket) {
  Session.findById(id)
  .then((session) => {
    Film.findAll()
    .then(films => {
      Cinema.findAll()
      .then(cinemas => {
        let data = {
          films: films, 
          cinemas: cinemas, 
          session: session
        }
        console.log("session shown");
        socket.emit('session shown',data);
        socket.broadcast.emit('session shown',data);
      })
    })
  })
  .catch(err => console.log(err));
}

function updateSession(id,data,socket) {
  Session.update(data, {where: { id: id }})
  .then((session) => {
    console.log("session updated",session);
  })
  .catch(err => console.log(err));
}

function deleteSession(id,socket) {
  Session.destroy({where: {id: id}})
  .then((session) => {
    console.log("session deleted");
  });
}


module.exports = {
  getSessions,
  addNewSession,
  createSession,
  showSession,
  updateSession,
  deleteSession
};

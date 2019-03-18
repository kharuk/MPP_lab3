const Film  = require('../models/film');
const Cinema = require('../models/cinema');
const Session  = require('../models/session');

function getSessions(req, res) {
  Session.findAll()
  .then(sessions => {
    res.json(sessions);
  })
  .catch(err => res.send(err));
}

function addNewSession(req, res) {
  Film.findAll()
  .then(films => {
   // let film_info = films;
    Cinema.findAll()
    .then(cinemas => {
      let date = {
        films: films,
        cinemas: cinemas
      }
     // console.log(date);
      res.json(date);
    //  res.render("./session/create-edit", {film_info: films, cinema_info: cinemas});
    })
  })
  .catch(err => res.send(err));
  
}

function createSession(req, res) {
  console.log('body',req.body);
  Session.create(req.body)
  .then(() => {
    res.status(200).json({'session': 'session is added successfully'});
  })
  .catch(err => res.send(err));
}

function showSession(req, res) {
  Session.findById(req.params.id)
  .then((session) => {
    Film.findAll()
    .then(films => {
     // let film_info = films;
      Cinema.findAll()
      .then(cinemas => {
        let data = {
          films: films, 
          cinemas: cinemas, 
          session: session
        }
        res.json(data)
      })
 //   res.render("./session/create-edit", {viewTitle: "Update Session", session})
    })
  })
  .catch(err => res.send(err));
}

function updateSession(req, res) {
  Session.update(req.body, {where: { id: req.params.id }})
  .then(() => {
    res.json('session: Update complete');
  })
  .catch(err => res.send(err));
}

function deleteSession(req, res) {
  Session.destroy({where: {id: req.params.id}})
  .then(() => {
    res.json('Successfully removed');
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

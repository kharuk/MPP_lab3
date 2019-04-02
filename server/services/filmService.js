const Film  = require('../models/film');

function getFilms(socket) {
  Film.findAll()
  .then(films => {
    console.log("film recived");
    socket.emit('film recived',films);
    socket.broadcast.emit('task recived',films);
  })
  .catch(err => console.log(err));
}

function createFilm(film,socket) {
  Film.create(film)
  .then((film) => {
    console.log("film created");
    socket.emit('film created',film);
    socket.broadcast.emit('task created',film);
    //res.redirect('/films');
  })
  .catch(err => console.log(err));
}

function showFilm(id, socket) {
   Film.findById(id)
  .then((film) => {
    console.log("film shown");
    socket.emit('film shown',film);
    socket.broadcast.emit('task shown',film);
  })
  .catch(err => console.log(err)); 
}

function updateFilm(id,data,socket) {
  console.log(data);
  Film.update(data, {where: { id: id }})
  .then((film) => {
    console.log("film updated",film);
    socket.emit('film updated',film);
    socket.broadcast.emit('film updated',film);
   // res.redirect("/films");
  })
  .catch(err => console.log(err));
}

function deleteFilm(id,socket) {
  Film.destroy({where: {id: id}})
  .then((film) => {
    console.log("film deleted");
    socket.emit('film deleted',film.id);
    socket.broadcast.emit('film deleted',film.id);
  });
}

module.exports = {
  getFilms,
  createFilm,
  showFilm,
  updateFilm,
  deleteFilm
};






// Defined edit route


//  Defined update route


// Defined delete | remove | destroy route


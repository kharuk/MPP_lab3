const Cinema  = require('../models/cinema');

function getCinemas(socket) {
  Cinema.findAll()
  .then(cinemas => {
    console.log("cinema recived");
    socket.emit('cinema recived',cinemas);
    socket.broadcast.emit('cinema recived',cinemas);
  })
  .catch(err => console.log(err));
}

function createCinema(cinema,socket) {
  Cinema.create(cinema)
  .then((cinema) => {
    console.log("cinema created");
  })
  .catch(err => console.log(err));
}

function showCinema(id, socket) {
  Cinema.findById(id)
  .then((cinema) => {
    console.log("cinema shown");
    socket.emit('cinema shown',cinema);
    socket.broadcast.emit('cinema shown',cinema);
  })
  .catch(err => console.log(err)); 
}

function updateCinema(id,data,socket) {
  Cinema.update(data, {where: { id: id }})
  .then((cinema) => {
    console.log("cinema updated",cinema);
  })
  .catch(err => console.log(err));
}

function deleteCinema(id,socket) {
  Cinema.destroy({where: {id: id}})
  .then((cinema) => {
    console.log("cinema deleted");
  });
}

module.exports = {
  getCinemas,
  createCinema,
  showCinema,
  updateCinema,
  deleteCinema
};

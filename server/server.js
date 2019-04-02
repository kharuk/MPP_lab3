const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db_connection');
const router = require('./routes/api');
const app = express();
const cors = require('cors');
const io = require("socket.io")();

const authServices = require("./services/authService");
const cinemaServices = require("./services/cinemaService");
const filmServices = require("./services/filmService");
const sessionServices = require("./services/sessionService");

 app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

db.authenticate()
    .then(() => console.log("Successful connection"))
    .catch(err => console.log("bad connect"));

 app.use(router);

app.listen(8080, () => {
  console.log(`Server started on port 8080`);
}); 


io.on("connection", function(socket) {
  socket.on("create film", film => {
    filmServices.createFilm(film, socket);
  });
  socket.on("delete film", id => {
    filmServices.deleteFilm(id, socket);
  });
  socket.on("get films", () => {
    filmServices.getFilms(socket);
  });
  socket.on("update film",(id, data) => {
    console.log('qwerty', id, data);
    filmServices.updateFilm(id, data, socket);
  });
  socket.on("show film",(id) => {
    filmServices.showFilm(id, socket);
  });
});

const port = 8000;
io.listen(port);
console.log("Socket IO listening on port ", port);
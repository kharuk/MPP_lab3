const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db_connection');
const router = require('./routes/api');
const app = express();
const cors = require('cors');
const io = require("socket.io")();
const config = require('./config/jwtSecret');
let jwt = require('jsonwebtoken');

const authServices = require("./services/authService");
const cinemaServices = require("./services/cinemaService");
const filmServices = require("./services/filmService");
const sessionServices = require("./services/sessionService");
const VerifyToken = require('./middleware/verifyToken');

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

 io.use((socket, next) => {
  const token = socket.handshake.query.token;
  if(!token){
    console.log('No token');
  }else {
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(JSON.stringify(
        {
            status: 401,
            message: "Unauthorized"
        }));
      //console.log(err);
      return next({message: "Unauthorized", status: 401});
    } 
    next();
  });
}
 })
.on("connection", function(socket) {
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
    filmServices.updateFilm(id, data, socket);
  });
  socket.on("show film",(id) => {
    filmServices.showFilm(id, socket);
  });

  socket.on("create cinema", cinema => {
    cinemaServices.createCinema(cinema, socket);
  });
  socket.on("delete cinema", id => {
    cinemaServices.deleteCinema(id, socket);
  });
  socket.on("get cinemas", (token) => {
    cinemaServices.getCinemas(socket);
  });
  socket.on("update cinema",(id, data) => {
    cinemaServices.updateCinema(id, data, socket);
  });
  socket.on("show cinema",(id) => {
    cinemaServices.showCinema(id, socket);
  });

  socket.on("create session", session => {
    sessionServices.createSession(session, socket);
  });
  socket.on("delete session", id => {
    sessionServices.deleteSession(id, socket);
  });
  socket.on("get sessions", () => {
    console.log('here');
    sessionServices.getSessions(socket);
  });
  socket.on("update session",(id, data) => {
    sessionServices.updateSession(id, data, socket);
  });
  socket.on("show session",(id) => {
    sessionServices.showSession(id, socket);
  });
  socket.on("befor add session",() => {
    sessionServices.addNewSession(socket);
  });


});

const port = 8000;
io.listen(port);
console.log("Socket IO listening on port ", port);
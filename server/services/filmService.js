const Film  = require('../models/film');

function getFilms(req, res) {
  Film.findAll()
  .then(films => {
    res.json(films);
  })
  .catch(err => res.send(err));
}

function createFilm(req, res) {
  Film.create(req.body)
  .then(() => {
    res.status(200).json({'films': 'film is added successfully'});
    //res.redirect('/films');
  })
  .catch(err => res.status(400).send("unable to save to database"));
}

function showFilm(req, res) {
  Film.findById(req.params.id)
  .then((film) => res.json(film))
  .catch(err => res.send(err));
}

function updateFilm(req, res) {
  Film.update(req.body, {where: { id: req.params.id }})
  .then(() => {
    res.json('films: Update complete');
   // res.redirect("/films");
  })
  .catch(err => res.send(err));
}

function deleteFilm(req, res) {
  Film.destroy({where: {id: req.params.id}})
  .then(() => {
    res.json('Successfully removed');
   // res.redirect('/films');
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


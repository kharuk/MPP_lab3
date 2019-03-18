const Cinema  = require('../models/cinema');

function getCinemas(req, res) {
  Cinema.findAll()
  .then(cinemas => {
    res.json(cinemas);
  })
  .catch(err => res.send(err));
}

function createCinema(req, res) {
  console.log(req.body);
  Cinema.create(req.body)
  .then(() => {
 //   res.redirect('/cinemas'));
    res.status(200).json({'cinemas': 'cinema is added successfully'})
  })
  .catch(err => res.status(400).send("unable to save to database"));
}

function showCinema(req, res) {
  Cinema.findById(req.params.id)
  .then((cinema) => res.json(cinema))
  .catch(err => res.send(err));
}

function updateCinema(req, res) {
  Cinema.update(req.body, {where: { id: req.params.id }})
  .then(() => res.json('cinemas: Update complete'))
  .catch(err => res.send(err));
}

function deleteCinema(req, res) {
  Cinema.destroy({where: {id: req.params.id}})
  .then(() =>{
    res.json('Successfully removed');
  }); //res.redirect('/cinemas'));
}

module.exports = {
  getCinemas,
  createCinema,
  showCinema,
  updateCinema,
  deleteCinema
};

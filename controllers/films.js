var express = require('express');
var app = express();
var filmRouter = express.Router();

// var films = require('../client/src/models/films')();
var Film = require('../client/src/models/film');
// var Review = require('../client/src/models/review');

var FilmQuery = require("../client/db/filmQuery.js");
var query = new FilmQuery();


//film by id
filmRouter.get('/:id', function(req, res){
  res.json(films[req.params.id]);
});

//film index
filmRouter.get('/', function(req, res) {
  // res.json(films);
  query.all(function(results){
    res.json(results);
  })
});

//film update
filmRouter.put('/:id', function(req, res) {
  var film = new Film({
    title: req.body.title,
    actors: req.body.actors
  });
  films[req.params.id] = film;
  res.json({data: films});
});

//add new film
filmRouter.post('/', function(req, res) {
  var film = new Film({
    title: req.body.title,
    actors: req.body.actors,
    genre: req.body.genre
  });
  query.add(film)
    // res.json(results);
    res.redirect("/");
});

//delete film
filmRouter.delete('/:id', function(req, res) {
  films.splice(req.params.id, 1);
  res.json({data: films});
});

//add review
filmRouter.post('/:id/reviews', function(req, res) {
  var film = films[req.params.id];
  var review1 = new Review({
    comment: "Amaze",
    rating: 10,
    author: "Val"
  });
  film.addReview(review1);
  res.json({data: films});
});


module.exports = filmRouter;

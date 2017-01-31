var Film = require('./film');
var Review = require('./review');

var Films = function() {

}

Films.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  },

  makePost: function(url, callback, newData){
    var data = JSON.stringify(newData);
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = callback;
    request.send(data);
  },

  all: function(callback){
    //this refers to the entire Film object.
    var self = this;
    this.makeRequest("http://localhost:3000/api/films", function() {
      if (this.status !== 200){
        return;
      }
      var jsonString = this.responseText;
      //this refers to the response object
      var result = JSON.parse(jsonString);
      var films = self.populateFilms(result);
      callback(films);
    });
  },
  populateFilms: function(results){
    var films = [];

    for(var result of results){
      var  film = new Film(result);
      films.push(film);
    }
    return films;
  }

}

module.exports = Films;

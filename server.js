console.log("test");

var express = require("express");
var app = express();
var port = 3000;
var fetch = require("node-fetch");
var fetchAbsolute = require("fetch-absolute");

app.set("view engine", "ejs");

app.use(express.static("static"));

app.get("/", function(req, res) {
  fetch(
    "https://raw.githubusercontent.com/sterrevangeest/performance-matters-1819/master/static/results.json"
  )
    .then(res => res.json())
    .then(function(data) {
      var data = data.data;
      var allSubjects = [];
      var subjects = data.map(function(items) {
        if (items.genre !== null) {
          allSubjects.push(items.genre);
        }
      });

      var filteredArray = allSubjects.filter(function(item, pos) {
        return allSubjects.indexOf(item) == pos;
      });

      res.render("pages/index", {
        data: data,
        filteredArray: filteredArray
      });
    });
});

app.get("/:item", function(req, res) {
  var id = req.params.item;
  console.log(id);
  // res.send(req.params.item);

  fetch(
    "https://raw.githubusercontent.com/sterrevangeest/performance-matters-1819/master/static/results.json"
  )
    .then(res => res.json())
    .then(function(data) {
      var data = data.data;
      return data;
    })
    .then(function(data) {
      var genreData = data.filter(function(items) {
        // console.log(items);
        return items.genre === id;
      });
      console.log(genreData.length);
      res.render("pages/genre", {
        data: genreData
      });
    });
});

app.get("/:item/:isbn", function(req, res) {
  var id = req.params.isbn;
  console.log(id);
  fetch(
    "https://raw.githubusercontent.com/sterrevangeest/performance-matters-1819/master/static/results.json"
  )
    .then(res => res.json())
    .then(function(data) {
      var data = data.data;
      return data;
    })

    .then(function(data) {
      var object = data.find(item => item.isbn === id);
      // var suggestions = data.filter(function(items) {
      //   return items.subject === object.subject && items.isbn !== id;
      // });
      console.log(object);
      res.render("pages/about", {
        object: object
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Example on ${port}`));

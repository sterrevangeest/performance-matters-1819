console.log("test");

var express = require("express");
var app = express();
var port = 3000;

app.set("view engine", "ejs");

app.use(express.static("static"));

app.get("/", function(req, res) {
  var drinks = [
    { name: "Bloody Mary", drunkness: 3 },
    { name: "Martini", drunkness: 5 },
    { name: "Scotch", drunkness: 10 }
  ];
  var tagline =
    "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

  res.render("pages/index", {
    drinks: drinks,
    tagline: tagline
  });
});

app.get("/about", function(req, res) {
  res.render("pages/about");
});

app.listen(port, () => console.log(`Example on ${port}`));

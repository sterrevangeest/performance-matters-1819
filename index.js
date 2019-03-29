console.log("test");

var init = {
  settings: function() {
    //EXPRESS
    var express = require("express");
    var app = express();
    var port = 3000;

    app.listen(process.env.PORT || 8000);

    require("dotenv").config();

    // CASHING
    app.use((req, res, next) => {
      res.append("Access-Control-Allow-Origin", ["*"]);
      res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.append("Access-Control-Allow-Headers", "Content-Type");
      res.append("Cache-Control", "max-age=" + 365 * 24 * 60 * 60);
      next();
    });

    // COMPRESSION
    var compression = require("compression");
    app.use(compression());
    app.use(express.static("static"));

    //MINIFY HTML
    var minifyHTML = require("express-minify-html");
    app.use(
      minifyHTML({
        override: true,
        exception_url: false,
        htmlMinifier: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          minifyJS: true
        }
      })
    );

    //TEMPLATE
    var ejs = require("ejs");
    app.set("view engine", "ejs");

    routes.listen(app, port);
    routes.get(app, port);
  }
};

var routes = {
  listen: function(app, port) {
    app.listen(port, () => console.log(`Yeet`));
  },
  get: function(app, port) {
    app.get("/", function(req, res) {
      api.getBooks().then(function(data) {
        render.overview(res, data);
      });
    });
    app.get("/muziek-op-maat-aanvragen", function(req, res) {
      api.getMusic().then(function(data) {
        api.getList().then(function(result) {
          render.muziek(res, data, result);
        });
      });
    });
    app.get("/muziek-op-maat-aanvragen/:id", function(req, res) {
      console.log(req.params.id);
      api.getMusic().then(function(data) {
        var track = data.find(function(data) {
          if (data.track_id === Number(req.params.id)) {
            return data;
          }
        });
        render.detailMuziek(res, track);
      });
    });
    // app.get("/service-worker.js", function(req, res) {
    //   res.send("service worker");
    // });
  },
  post: function(app, port) {
    app.post("/muziek-op-maat-aanvragen", function(req, res) {
      res.send("POST request to the homepage");
    });
  }
};

var api = {
  getBooks: function() {
    var fetch = require("node-fetch");
    return fetch(
      "https://raw.githubusercontent.com/sterrevangeest/performance-matters-1819/master/data/books.json"
    ).then(function(result) {
      return result.json();
    });
  },
  getMusic: function() {
    // ------ GET & WRITE API DATA TO FILE ------
    // var unirest = require("unirest");
    // return unirest
    //   .get(
    //     "https://musixmatchcom-musixmatch.p.rapidapi.com/wsr/1.1/track.search?page_size=20&page=1"
    //   )
    //   .header(
    //     "X-RapidAPI-Key",
    //     "process.env.DB_PASS"
    //   )
    //   .then(function(result) {
    //     console.log(result.body);

    // console.log(JSON.parse(result));
    // // var result = JSON.parse(result.body);
    // // var result = JSON.stringify(result);
    // // var fs = require("fs");
    // // fs.writeFile("public/javascript/data.json", result, function(err) {
    // //   if (err) {
    // //     return console.log(err);
    // //   }
    // //   console.log("The file was saved!");
    // // });
    // return result;
    // -----------------------------------------
    var fetch = require("node-fetch");
    return fetch(
      "https://raw.githubusercontent.com/sterrevangeest/musiXmatch-api/master/public/javascript/data.json"
    ).then(function(result) {
      return result.json();
    });
  },
  getList: function() {
    var fetch = require("node-fetch");
    return fetch(
      "https://raw.githubusercontent.com/sterrevangeest/performance-matters-1819/master/data/savedMusic.json"
    ).then(function(result) {
      return result.json();
    });
  }
};

var render = {
  overview: function(res, data) {
    res.render("pages/index", {
      data: data
    });
  },
  muziek: function(res, data, result) {
    console.log(result);
    res.render("pages/muziek-op-maat-aanvragen", {
      data: data,
      result: result
    });
  },
  detailMuziek: function(res, data) {
    res.render("pages/detail", {
      data: data
    });
  }
};

init.settings();

const gulp = require("gulp");
const cssnano = require("gulp-cssnano");
const concat = require("gulp-concat");
const baseDir = "static/";

gulp
  .src([baseDir + "styles.css"])
  .pipe(concat("styles-minify.css"))
  .pipe(cssnano({ discardComments: { removeAll: true } }))
  .pipe(gulp.dest("static/minified"));

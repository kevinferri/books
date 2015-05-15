var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css');

// Uglifies js
gulp.task('js', function() {
  gulp.src('./bower_components/materialize/dist/js/materialize.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
});

// Minifies css
gulp.task('css', function() {
  gulp.src('./bower_components/materialize/dist/css/materialize.css')
  .pipe(minifyCss())
  .pipe(gulp.dest('build/css'));
});

// Pipes fonts
gulp.task('fonts', function() {
  gulp.src('./bower_components/materialize/dist/font/*/*')
  .pipe(gulp.dest('build/fonts'));
});

gulp.task('default', ['js', 'css', 'fonts']);
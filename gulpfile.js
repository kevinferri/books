var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename');

// Holds all the files we want to use within gulp
var gulpFiles = {
  js: [
    './bower_components/jquery/dist/jquery.js',
    './bower_components/underscore/underscore.js',
    './bower_components/backbone/backbone.js',
    './bower_components/materialize/dist/js/materialize.js',
  ],
  css: [
    './bower_components/materialize/dist/css/materialize.css'
  ],
  fonts: [
    './bower_components/materialize/dist/font/*/*'
  ]
};

// Uglifies js, adds .min extension, and sends to /build/js
gulp.task('js', function() {
  gulpFiles.js.forEach(function(file) {
    gulp.src(file)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('build/js'));
  });
});

// Minifies css, adds .min extension, sends to /build/css
gulp.task('css', function() {
  gulpFiles.css.forEach(function(file) {
    gulp.src(file)
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' })) 
    .pipe(gulp.dest('build/css'));
  });
});

// Sends fonts to /build/font
gulp.task('fonts', function() {
  gulpFiles.fonts.forEach(function(file) {
    gulp.src(file)
    .pipe(gulp.dest('build/font'));
  });
});

gulp.task('default', ['js', 'css', 'fonts']);
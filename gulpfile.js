var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename');

// Holds all the files we want to use within gulp
var gulpFiles = {
  js: [
    './src/app/bower_components/jquery/dist/jquery.js',
    './src/app/bower_components/underscore/underscore.js',
    './src/app/bower_components/backbone/backbone.js',
    './src/app/bower_components/materialize/dist/js/materialize.js',
  ],
  css: [
    './src/app/bower_components/materialize/dist/css/materialize.css'
  ],
  fonts: [
    './src/app/bower_components/materialize/dist/font/*/*'
  ]
};

// Uglifies js, adds .min extension, and sends to /build/js
gulp.task('js', function() {
  gulpFiles.js.forEach(function(file) {
    gulp.src(file)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('src/build/js'));
  });
});

// Minifies css, adds .min extension, sends to /build/css
gulp.task('css', function() {
  gulpFiles.css.forEach(function(file) {
    gulp.src(file)
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' })) 
    .pipe(gulp.dest('src/build/css'));
  });
});

// Sends fonts to /build/font
gulp.task('fonts', function() {
  gulpFiles.fonts.forEach(function(file) {
    gulp.src(file)
    .pipe(gulp.dest('src/build/font'));
  });
});

gulp.task('default', ['js', 'css', 'fonts']);
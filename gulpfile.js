var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-minify-html');

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
  ],
  html: [
    './src/app/views/*'
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

gulp.task('html', function() {
  gulpFiles.html.forEach(function(file) {
    gulp.src(file)
    .pipe(minifyHTML())
    .pipe(gulp.dest('src/build/views'));
  });
});

gulp.task('default', ['js', 'css', 'fonts', 'html']);
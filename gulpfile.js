var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-minify-html');

// Holds all the files we want to use within gulp
var gulpFiles = {
  html: [
    './src/app/main.html',
    './src/app/views/*.html'
  ],
  bowerJs: [
    './src/app/bower_components/jquery/dist/jquery.min.js',
    './src/app/bower_components/underscore/underscore-min.js',
    './src/app/bower_components/backbone/backbone-min.js',
    './src/app/bower_components/materialize/dist/js/materialize.min.js',
  ],
  bowerCss: [
    './src/app/bower_components/materialize/dist/css/materialize.css'
  ],
  fonts: [
    './src/app/bower_components/materialize/dist/font/*/*'
  ]
};

// Uglifies js, adds .min extension, and sends to /build/js
gulp.task('js', function() {
  gulpFiles.bowerJs.forEach(function(file) {
    gulp.src(file)
    .pipe(gulp.dest('src/build/js'));
  });
});

// Minifies css, adds .min extension, sends to /build/css
gulp.task('css', function() {
  gulpFiles.bowerCss.forEach(function(file) {
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
    var dest = '';
    if (file === './src/app/main.html') {
      dest = 'src/build';
    } else {
      dest = 'src/build/views';
    }
    gulp.src(file)
    .pipe(minifyHTML())
    .pipe(gulp.dest(dest));
  });
});

gulp.task('default', ['js', 'css', 'fonts', 'html']);
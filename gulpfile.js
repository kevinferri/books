var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-minify-html');
var sass = require('gulp-sass');

// Holds all the files we want to use within gulp
var gulpFiles = {
  html: [
    './app/main.html',
    './app/views/*.html'
  ],
  sass: [
    './app/sass/*.scss',
  ],
  fonts: [
    './node_modules/materialize-css/font/*/*'
  ]
};

// Complies sass to css and minifies the css
gulp.task('sass', function () {
  gulpFiles.sass.forEach(function(file) {
    gulp.src(file)
    .pipe(sass().on('error', sass.logError))
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

// Minifies html
gulp.task('html', function() {
  gulpFiles.html.forEach(function(file) {
    var dest = '';
    if (file === './app/main.html') {
      dest = 'build';
    } else {
      dest = 'build/views';
    }
    gulp.src(file)
    .pipe(minifyHTML())
    .pipe(gulp.dest(dest));
  });
});

gulp.task('default', ['html', 'sass', 'fonts']);
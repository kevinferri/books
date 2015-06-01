var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-minify-html');
var sass = require('gulp-sass');

// Holds all the files we want to use within gulp
var gulpFiles = {
  html: [
    './src/app/main.html',
    './src/app/views/*.html'
  ],
  sass: [
    './src/app/sass/*.scss'
  ],
  js: [
    './src/app/app.js'
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

// Complies sass to css and minifies the css
gulp.task('sass', function () {
  gulpFiles.sass.forEach(function(file) {
    gulp.src(file)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' })) 
    .pipe(gulp.dest('src/build/css'));
  });
});

gulp.task('js', function () {
  gulpFiles.js.forEach(function(file) {
    gulp.src(file)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' })) 
    .pipe(gulp.dest('build/js'));
  });
});

// Uglifies js, adds .min extension, and sends to /build/js
gulp.task('bowerJs', function() {
  gulpFiles.bowerJs.forEach(function(file) {
    gulp.src(file)
    .pipe(gulp.dest('build/js'));
  });
});

// Minifies css, adds .min extension, sends to /build/css
gulp.task('bowerCss', function() {
  gulpFiles.bowerCss.forEach(function(file) {
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

gulp.task('html', function() {
  gulpFiles.html.forEach(function(file) {
    var dest = '';
    if (file === './src/app/main.html') {
      dest = 'build';
    } else {
      dest = 'build/views';
    }
    gulp.src(file)
    .pipe(minifyHTML())
    .pipe(gulp.dest(dest));
  });
});

gulp.task('watch', function() {
  gulp.watch('./src/app/app.js', ['js']);
});

gulp.task('default', ['bowerJs', 'bowerCss', 'fonts', 'html', 'sass', 'js', 'watch']);
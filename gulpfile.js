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
  ],
  vendorJs: [
    './node_modules/materialize-css/bin/materialize.js',
    './node_modules/jquery/dist/jquery.js',
  ],
  vendorCss: [
    './node_modules/materialize-css/bin/materialize.css'
  ],
  watch: [
    {
      files: ['./app/sass/*.scss'],
      task: ['sass']
    },
    {
      files: ['./app/main.html', './app/views/*.html'],
      task: ['html']
    },
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
    .pipe(gulp.dest('build/vendor/font'));
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

// Uglifies js, adds .min extension, and sends to /build/js
gulp.task('vendorJs', function() {
  gulpFiles.vendorJs.forEach(function(file) {
    gulp.src(file)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('build/vendor/js'));
  });
});

// Minifies css, adds .min extension, sends to /build/css
gulp.task('vendorCss', function() {
  gulpFiles.vendorCss.forEach(function(file) {
    gulp.src(file)
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('build/vendor/css'));
  });
});

// Watches
gulp.task('watch', function() {
  gulpFiles.watch.forEach(function(watchItem) {
    var task = watchItem.task;
     watchItem.files.forEach(function(file) {
       gulp.watch(file, task);
     });
  });
});

gulp.task('default', ['html', 'sass', 'fonts', 'vendorJs', 'vendorCss']);

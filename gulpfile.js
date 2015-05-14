var gulp = require('gulp');
var uglify = require('gulp-uglify');

// Uglifies js
gulp.task('js', function() {
  gulp.src('./bower_components/materialize/dist/js/materialize.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
});

// Uglifies css
gulp.task('css', function() {
  gulp.src('./bower_components/materialize/dist/css/materialize.css')
  .pipe(uglify())
  .pipe(gulp.dest('build/css'));
});
  
// Watches js
gulp.task('watch', function() {
  gulp.watch('./public/javascripts/*.js', ['scripts']);
});

gulp.task('default', ['js', 'watch']);
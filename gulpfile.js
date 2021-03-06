var gulp = require('gulp');
var uglify = require('gulp-uglify'); // compressing javascript files
var minify = require('gulp-minify-css'); // compressing css
var concat = require('gulp-concat'); // joining files
var plumber = require('gulp-plumber'); // fix for errors
var sass = require('gulp-sass'); // sass
var gulpSequence = require('gulp-sequence'); // running tasks in provided sequence
var autoprefixer = require('gulp-autoprefixer'); // fixes -webkit- prefixes in deploy
var browserSync = require('browser-sync'); // syncs your IDE/text editor with browser
var del = require('del'); // deleting files/folders
var rename = require('gulp-rename'); // creates and renames files
var vinylPaths = require('vinyl-paths'); // handles paths, helper for 'del'
var gutil = require('gulp-util');


// Tasks for developing (coding)

gulp.task('php', function () {
  gulp.src('public/*')
    .pipe(plumber())
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('host', function () {
  browserSync.init({
    proxy: 'http://portfolio.com'
  });
});

var handleError = function(error){
  gutil.log(error.message)
  this.emit('end');
}

gulp.task('js', ['cleanJs'], function () {
  return gulp.src(['public/assets/scripts/own/my.js'])
    .pipe(plumber())
    .pipe(rename('main.js'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/assets/scripts'))
    .pipe(browserSync.stream());
});

gulp.task('scss', ['cleanScss'], function () {
  return gulp.src(['public/assets/styles/scss/main.scss'])
    .pipe(plumber(handleError))
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/assets/styles'))
    .pipe(browserSync.stream());
});

gulp.task('cleanScss', function () {
  return gulp.src('public/assets/styles/styles.css')
    .pipe(vinylPaths(del))
});

gulp.task('cleanJs', function () {
  return gulp.src('public/assets/scripts/main.js')
    .pipe(vinylPaths(del))
});

gulp.task('watch', function() {
  gulp.watch(['public/assets/styles/**/*.scss', 'public/styles/**/*.css', '!public/styles/styles.css'], ['scss']);
  gulp.watch(['public/assets/scripts/**/*.js', '!public/scripts/main.js'], ['js']);
  gulp.watch('public/*.php', ['php']);
})

gulp.task('default', gulpSequence(['php', 'js', 'scss'], 'host', 'watch'));

// Tasks for deploying (distribution)

gulp.task('scssDeploy', ['cleanScss'], function () {
  return gulp.src(['public/assets/styles/scss/main.scss'])
      .pipe(plumber(handleError))
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(minify())
      .pipe(concat('main.css'))
      .pipe(gulp.dest('public/assets/styles'))
});

gulp.task('jsDeploy', function () {
  return gulp.src(['public/assets/scripts/main.js'])
      .pipe(plumber())
      .pipe(rename('main.min.js'))
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/assets/scripts'))
});


gulp.task('deploy', gulpSequence(['jsDeploy', 'scssDeploy']));
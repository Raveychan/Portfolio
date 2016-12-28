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
  gulp.src('app/views/*')
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
  return gulp.src(['public/scripts/own/my.js'])
    .pipe(plumber())
    .pipe(rename('main.js'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/scripts'))
    .pipe(browserSync.stream());
});

gulp.task('scss', ['cleanScss'], function () {
  return gulp.src(['public/styles/scss/main.scss'])
    .pipe(plumber(handleError))
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/styles'))
    .pipe(browserSync.stream());
});

gulp.task('cleanScss', function () {
  return gulp.src('public/styles/styles.css')
    .pipe(vinylPaths(del))
});

gulp.task('cleanJs', function () {
  return gulp.src('public/scripts/main.js')
    .pipe(vinylPaths(del))
});

gulp.task('watch', function() {
  gulp.watch(['public/styles/**/*.scss', 'public/styles/**/*.css', '!public/styles/styles.css'], ['scss']);
  gulp.watch(['public/scripts/**/*.js', '!public/scripts/main.js'], ['js']);
  gulp.watch('public/views/*.php', ['php']);
})

gulp.task('default', gulpSequence(['php', 'js', 'scss'], 'host', 'watch'));

// Tasks for deploying (distribution)

gulp.task('htmlDeploy', function () {
  gulp.src(['public/*', 'public/.*', 'public/fonts/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest('dist'));
});

gulp.task('scssDeploy', function () {
  gulp.src(['public/styles/styles.css'])
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(minify())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('jsDeploy', function () {
  return gulp.src(['public/scripts/**/*.js', '!public/scripts/main.js'])
    .pipe(plumber())
    .pipe(rename('main.js'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('imagesDeploy', function () {
  gulp.src(['public/images/*.png', 'public/images/*.jpg', 'public/images/*.ico'])
    .pipe(plumber())
    .pipe(imageopt({
      optimalizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('cleanDeploy', function () {
  return gulp.src('dist')
    .pipe(vinylPaths(del))
});

gulp.task('deploy', gulpSequence(['html', 'js', 'scss'], 'cleanDeploy', ['htmlDeploy', 'jsDeploy', 'scssDeploy']));
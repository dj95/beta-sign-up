const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const header = require('gulp-header');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const maps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
  ' * ETdb  - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' */\n',
  ''
].join('');

gulp.task('clean', () => gulp.src('css/dist', { read: false }).pipe(clean()));

gulp.task('sass', () => gulp.src('styles/scss/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(header(banner, { pkg: pkg }))
  .pipe(maps.write('../maps'))
  .pipe(gulp.dest('styles/css')));

// Minify compiled CSS
gulp.task('minify-css', () => gulp.src('styles/css/*.css')
  .pipe(maps.init())
  .pipe(rename({ suffix: '.min' }))
  .pipe(maps.write('../maps'))
  .pipe(gulp.dest('styles/dist'))
  .pipe(browserSync.reload({
    stream: true
  })));

// Run everything
gulp.task('default', ['clean', 'sass', 'minify-css']);

// Configure the browserSync task
gulp.task('browserSync', () => browserSync.init({
  server: { baseDir: '' },
  ui: { port: 8081 },
  port: 8080
}));

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'default'], () => {
    gulp.watch('styles/scss/*.scss', ['sass']);
    gulp.watch('styles/css/*.css', ['minify-css']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});

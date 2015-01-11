'use strict';

var gulp = require('gulp'),
    templateCache = require('gulp-angular-templatecache'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    paths = {
        js: ['public/**/*.js', 'public/test/**/*.js', '!public/app.min.js','!public/templates.js', '!public/vendor/**/*.js'],
        html: ['public/**/views/**/*.html'],
        css: ['public/**/stylesheets/*.css', 'public/**/css/*.css'],
        sass: ['public/**/stylesheets/*.scss']
    };

gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(plugins.plumber())
    .pipe(plugins.sass())
    .pipe(plugins.csso())
    .pipe(gulp.dest('public'));
});

gulp.task('compress', function() {
  gulp.src([
    'public/vendor/angular.js',
    'public/vendor/*.js',
    'public/app.js',
    'public/services/*.js',
    'public/controllers/*.js',
    'public/filters/*.js',
    'public/directives/*.js'
  ])
    .pipe(plugins.concat('app.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('public'));
});

gulp.task('templates', function() {
  gulp.src(paths.html)
    .pipe(templateCache({ root: 'views', module: 'MyApp' }))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function () {
    gulp.watch(paths.js, ['jshint']).on('change', plugins.livereload.changed);
    gulp.watch(paths.html).on('change', plugins.livereload.changed);
    gulp.watch(paths.sass, ['sass']).on('change', plugins.livereload.changed);

    plugins.livereload.listen({interval: 500});
});

gulp.task('env:develop', function () {
    process.env.NODE_ENV = 'development';
});

gulp.task('jshint', function () {
  return gulp.src(paths.js.concat(['*.js']))
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
      //.pipe(count('jshint', 'files lint free'));
});

gulp.task('develop', ['env:develop'], function () {
    plugins.nodemon({
        script: 'server.js',
        ext: 'html js',
        env: { 'NODE_ENV': 'development' } ,
        ignore: ['./node_modules/**'],
        nodeArgs: ['--debug']
    });
});

gulp.task('default', ['sass', 'compress', 'templates', 'jshint', 'develop', 'watch']);

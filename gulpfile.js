var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');
var browserSync = require('browser-sync').create();

gulp.task('jade', function () {
    return gulp.src('./src/jade/index.jade')
        .pipe(plugins.jade())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

var lessPath = [path.join(__dirname, 'src', 'less', 'includes')];
gulp.task('less', function () {
    return gulp.src('./src/less/index.less')
        .pipe(plugins.less({ paths: lessPath }))
        .pipe(plugins.autoprefixer({
            browsers: ['> 1%', 'last 10 version'],
            cascade: true
        }))
        //.pipe(plugins.minifyCss({ compatibility: 'ie9' }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});
// javascript
gulp.task('scripts', function() {
    return gulp.src(['src/js/**/*.js', '!src/js/**/*.min.js'])
        // .pipe(plugins.jshint('.jshintrc'))
        // .pipe(plugins.jshint.reporter('default'))
        // .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream());
});

// copy files from ref
gulp.task('copy:js', function () {
   return gulp.src('src/ref/*.js')
       .pipe(gulp.dest('dist/js'));
});
gulp.task('copy:css', function () {
    return gulp.src('src/ref/*.css')
        .pipe(gulp.dest('dist/css'));
});
gulp.task('copy', ['copy:css', 'copy:js']);

// static server + watching
gulp.task('server', ['build'], function (done) {
    browserSync.init({
        server: 'dist'
    });
    gulp.watch('src/**/*.jade', ['jade']);
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});
// clean
gulp.task('clean', function() {
    return gulp.src(['dist/css/', 'dist/js/', 'dist/img/', 'dist/**/*.html'], {read: false})
        .pipe(plugins.clean());
});

gulp.task('build', ['jade', 'less', 'scripts', 'copy']);

gulp.task('deploy', ['build'], function () {
    return gulp.src('./dist/**/*')
        .pipe(plugins.ghPages());
});
gulp.task('default', ['server']);
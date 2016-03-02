var gulp = require('gulp'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss'),
    rimraf = require('rimraf'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify')
    runSequence = require('run-sequence');

var path = {
    src: { 
        html: './src/*.html', 
        js: './src/script/*.js',
        css: './src/css/*.css'
    },
    build: { 
        html: './build/',
        js: './build/script/',
        css: './build/css/'
    },
    watch: { 
        html: './src/*.html',
        js: './src/script/*.js',
        css: './src/css/*.css'
    },
    dist: {
        css: './src/lib/bootstrap/dist/css/bootstrap.css',
        js: ['./src/lib/jquery/dist/jquery.min.js', './src/lib/bootstrap/dist/js/bootstrap.min.js']
    },
    lib: { 
        css: './src/css/',
        js: './src/script/'
    },        
    clean: './build'
    
};

gulp.task('css:lib', function () {
    gulp.src(path.dist.css) 
        .pipe(gulp.dest(path.lib.css)) 
});

gulp.task('js:lib', function () {
    gulp.src(path.dist.js) 
        .pipe(gulp.dest(path.lib.js)) 
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(gulp.dest(path.build.html)) 
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(uglify()) 
        .pipe(gulp.dest(path.build.js)) 
});

gulp.task("css:build", function () {
    gulp.src(path.src.css)
        .pipe(uncss({
            html: ['src/default.html']
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('build', function(callback) {
  runSequence('clean',
              'css:build',
              'js:build',
              'html:build',       
              callback);
});


gulp.task('lib', [
    'css:lib',
    'js:lib'
]);

gulp.task('default', ['build']);
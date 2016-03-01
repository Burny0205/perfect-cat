var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uncss = require('gulp-uncss')
    cssmin = require("gulp-cssmin"),
    uglify = require('gulp-uglify');

var path = {
    build: { 
        html: './build/',
        js: './build/js/',
        css: './build/css/'
    },
    src: { 
        html: './src/*.html', 
        js: './src/js/*.js',
        style: './src/style/*.css'
    },
    watch: { 
        html: './src/*.html',
        js: './src/js/*.js',
        style: './src/style/*.css',
    },
    clean: './build'
};

gulp.task('html:build', function () {
    gulp.src(path1.src.html) 
        .pipe(gulp.dest(path.build.html)) 
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(uglify()) 
        .pipe(gulp.dest(path.build.js)) 
});

gulp.task("css:build", function () {
    gulp.src(path.src.style)
        .pipe(concat('site.css'))
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build'
]);
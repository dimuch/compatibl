/**
 * Created by dmytro.kostylov on 20.07.2016.
 */
var gulp = require("gulp"),
    less =require("gulp-less"),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require("gulp-concat"),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    del = require('del');

//очистка build directory
gulp.task("clean", function(){
    return del([
        "build/**/*"
    ])
});

// css
gulp.task("less", function() {
    return gulp.src(['less/**/*.less'])
        .pipe(less({compatibility: "ie9"}))
        .pipe(gulp.dest("build/css"));
});

// js minification
gulp.task('minify', function() {
    return gulp.src(['app.js', './directives/**/*.js', './controllers/**/*.js', './service/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
});

// //vendor js
gulp.task('minifyVendor', function(){
    gulp.src(['vendor/angular/angular.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
});

// Действия по умолчанию
gulp.task("dev", ["clean"], function(){
    gulp.start("less", "minifyVendor","minify");

    // Отслеживаем изменения в файлах
    gulp.watch("less/**/*.less", ['less']);

    gulp.watch(['./directives/**/*.js', './controllers/**/*.js', './service/**/*.js'], ['minify']);
});
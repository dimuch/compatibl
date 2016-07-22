/**
 * Created by dmytro.kostylov on 20.07.2016.
 */
var gulp = require("gulp"),
    less =require("gulp-less"),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require("gulp-concat"),
    browserify = require('browserify'),
    gutil = require('gulp-util'),
    del = require('del'),
    ngAnnotate = require('browserify-ngannotate');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

//очистка build directory
gulp.task("clean", function(){
    return del([
        "build/**/*"
    ])
});

// gulp.task('templateCache', function() {
//
//     var ngHtml2Js = require("gulp-ng-html2js"),
//         concat = require("gulp-concat");
//
//     return gulp.src("./templates/*.html")
//         .pipe(ngHtml2Js({
//             moduleName: "todoPartials",
//             prefix: "/partials/"
//         }))
//         .pipe(concat("templateCachePartials.js"))
//         .pipe(gulp.dest("./build/html"));
// });

// css
gulp.task("less", function() {
    return gulp.src(['less/**/*.less'])
        .pipe(less({compatibility: "ie9"}))
        .pipe(gulp.dest("build/css"));
});

// js minification
gulp.task('minify', function(){
   gulp.src(['./directives/*.js', './controllers/*.js', './service/*.js'])
       .pipe(concat('all.js'))
       .pipe(gulp.dest('./build/js'))
       .pipe(rename('all.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('./build/js'));
});

// Действия по умолчанию
gulp.task("dev", ["clean"], function(){
    gulp.start("less", "minify");

    // Отслеживаем изменения в файлах
    gulp.watch("less/**/*.less", ['less']);

    gulp.watch(['./directives/*.js', './controllers/*.js', './service/*.js'], ['minify']);
});
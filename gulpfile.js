/**
 * Created by dmytro.kostylov on 20.07.2016.
 */
var gulp = require("gulp"),
    less =require("gulp-less"),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require("gulp-concat"),
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
gulp.task('minify', function(){
   gulp.src(['app.js', './directives/**/*.js', './controllers/**/*.js', './service/**/*.js'])
       .pipe(concat('all.js'))
       .pipe(gulp.dest('./build/js'))
       .pipe(rename('app.min.js'))
       .pipe(gulp.dest('./build/js'));
});

// Действия по умолчанию
gulp.task("dev", ["clean"], function(){
    gulp.start("less", "minify");

    // Отслеживаем изменения в файлах
    gulp.watch("less/**/*.less", ['less']);

    gulp.watch(['./directives/*.js', './controllers/*.js', './service/*.js'], ['minify']);
});
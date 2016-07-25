/**
 * Created by dmytro.kostylov on 20.07.2016.
 */
var gulp = require("gulp"),
    less =require("gulp-less"),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    concat = require("gulp-concat"),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    del = require('del');

gulp.task("clean", function(){
    return del([
        "build/**/*"
    ])
});

gulp.task("less", function() {
    return gulp.src(['less/**/*.less'])
        .pipe(less({compatibility: "ie9"}))
        .pipe(gulp.dest("build/css"))
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("build/css"));
});

gulp.task("lessVendor", function() {
    return gulp.src(['assets/vendor-css/**/*.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("build/css/"));
});

gulp.task('minJS', function() {
    return gulp.src(['app.js', './directives/**/*.js', './controllers/**/*.js', './service/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
});

gulp.task('minJSVendor', function(){
    gulp.src(['assets/vendor-js/**/*.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('copyAssets', function() {
    gulp.src('assets/fonts/**/*').pipe(gulp.dest('build/fonts/'));
    gulp.src('assets/images/**/*').pipe(gulp.dest('build/images/'));
});


gulp.task("dev", ["clean"], function(){
    gulp.start("lessVendor","less", "minJSVendor", "minJS", "copyAssets");

  
    gulp.watch("less/**/*.less", ['less']);

    gulp.watch(['app.js','./directives/**/*.js', './controllers/**/*.js', './service/**/*.js'], ['minJS']);
});
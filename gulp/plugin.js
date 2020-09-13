module.exports = {
    gulp:  require('gulp'),
    plumber: require('gulp-plumber'),
    notify: require('gulp-notify'),
    yaml: require('yaml'),
    sass:  require('gulp-sass'),
    autoprefixer: require('gulp-autoprefixer'),
    uglify: require('gulp-uglify'),
    concat: require('gulp-concat'),
    rename: require('gulp-rename'),
    ejs: require('gulp-ejs'),
    fs: require('fs'),
    markdownpdf: require('markdown-pdf'),
    browserSync: require('browser-sync').create()
};
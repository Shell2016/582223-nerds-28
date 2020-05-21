const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-csso');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');


function css() {
    return src('source/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('source/css/'))
        .pipe(cssmin())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(dest('source/css/'))
        .pipe(sync.stream());
}

function browserSync() {
    sync.init({
        server: {
            baseDir: "source/"
        },
        notify: false
    });

    watch('source/sass/**/*.scss', css);
    watch("source/*.html").on('change', sync.reload);
}

// exports.имя_команды(любое) = имя функции
exports.css = css;
exports.default = series(css, browserSync);

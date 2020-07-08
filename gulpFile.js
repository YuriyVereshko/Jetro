let gulp = require('gulp'),
    concat = require('gulp-concat'),
    ugl = require('gulp-uglifycss'),
    scss = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

// Css
gulp.task('scss', function () {
    return gulp.src('./style.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(gulp.dest('./'));
});

gulp.task('concatMinifyCss', function() {
    return gulp.src('./style.css')
        // .pipe(concat('all-styles.css'))
        .pipe(autoprefixer({
            cascade: false,
            overrideBrowserslist: ['ie > 9', 'Firefox > 20']
        }))
        .pipe(ugl({
            'maxLineLen': 80,
            'uglyComments': true
        }))
        .pipe(gulp.dest('./dist/'))
    // .pipe(browserSync.reload({stream:true}));
});

// JS
gulp.task('jsOptimize', function () {
    return gulp.src([
        'js/isotope.pkgd.js',
        'js/jquery-3.5.0.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// img
gulp.task('imgOptimize', function () {
    return gulp.src('./img/**/*')
        .pipe(imagemin([
            imagemin.optipng()
        ]))
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('watchCSS', function () {
    gulp.watch('./styles/*.*').on('change', gulp.series('scss', 'concatMinifyCss'));
});
gulp.task('watchJS', function () {
    gulp.watch('./js/*.*').on('change', gulp.series('jsOptimize'));
});

gulp.task('default',  gulp.parallel(gulp.series('scss', 'concatMinifyCss'), 'imgOptimize'));

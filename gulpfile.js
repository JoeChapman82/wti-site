require('dotenv').config();
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const uglify = require('gulp-uglify-es').default;
const pump = require('pump');
const path = require('path');
const babel = require('gulp-babel');

const gulpConfig = {
    paths: {
        scss: `${__dirname}/dev/scss/**/*.scss`,
        scssDest: `${__dirname}/app/assets/css`,
        js: [`${__dirname}/dev/scripts/**/*.js`, `!${__dirname}/dev/scripts/gatherData.js`],
        jsDest: `${__dirname}/app/assets/scripts`,
        nunjucks: `${__dirname}/app/views/**/*.njk`,
        key: path.resolve(`${__dirname}/${process.env.KEY_FILE_PATH}`),
        cert: path.resolve(`${__dirname}/${process.env.CERT_FILE_PATH}`)
    }
};

console.log(gulpConfig);

function compileSass() {
    try {
        return gulp
            .src(gulpConfig.paths.scss)
            .pipe(
                sass({
                    outputStyle: 'compressed'
                }).on('error', sass.logError)
            )
            .pipe(gulp.dest(gulpConfig.paths.scssDest))
            .pipe(
                browserSync.reload({
                    stream: true
                })
            );
    } catch (error) {
        console.log(error);
    }
}

function minifyJs() {
    return gulp
        .src(gulpConfig.paths.js)
        .pipe(
            babel({
                presets: ['@babel/preset-env']
            })
        )
        .pipe(uglify())
        .pipe(gulp.dest(gulpConfig.paths.jsDest));
}

function nunjucks() {
    browserSync.reload();
}

function initBrowserSync() {
    let protocol = 'https';
    if (process.env.HTTPS === 'false') {
        protocol = 'http';
    }
    const bsConfig = {
        proxy: `${protocol}://localhost:${process.env.PORT}`,
        port: process.env.BSPORT || 4001,
        reloadDelay: 1000,
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        },
        open: false
    };
    if (process.env.HTTPS !== 'false') {
        bsConfig.https = {
            key: gulpConfig.paths.key,
            cert: gulpConfig.paths.cert
        };
    }
    browserSync.init(bsConfig);
}

function serverTask() {
    nodemon({
        script: 'index.js',
        ext: 'js'
    }).on('quit', function () {
        process.exit(0);
    });
}

// watch all scss and js files, run required tasks, refresh browser
function watch() {
    gulp.watch(
        gulpConfig.paths.scss,
        { interval: 1000, mode: 'poll' },
        compileSass
    );
    gulp.watch(gulpConfig.paths.js, { interval: 1000, mode: 'poll' }, minifyJs);
    gulp.watch(
        gulpConfig.paths.nunjucks,
        { interval: 1000, mode: 'poll' },
        nunjucks
    );
}

gulp.task(
    'default',
    gulp.parallel(watch, compileSass, minifyJs, serverTask, initBrowserSync)
);

gulp.task('build', gulp.parallel(compileSass, minifyJs));

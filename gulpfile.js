const { src, dest, series } = require('gulp');
const run = require('gulp-run');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

function test() {
    return browserify({
        basedir: 'test',
        entries: ['index.ts'],
    })
        .plugin(tsify, { declaration: true })
        .bundle()
        .pipe(source('index.js'))
        .pipe(dest("test"))
}

function runTest(cb) {
    return run('node test/index.js').exec('', cb);
}

function build() {
    return browserify({
        basedir: 'src',
        entries: ['index.ts'],
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(dest("./"));
};

exports.test = series(build, test, runTest);
exports.build = build;

const { dest } = require('gulp');
const run = require('gulp-run');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

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

exports.test = runTest;


const bundleDts = require('bundle-dts');
const gulp = require('gulp');

exports.dts = function () {
    return gulp.src('src/index.ts')
        .pipe(bundleDts())
        .pipe(gulp.dest('.'));
}
const pug = require('pug')
const gulp = require('gulp');
const es = require('event-stream')
const rename = require('gulp-rename')

function buildHtml() {
    return es.map(function (file, cb) {
        file.contents = new Buffer(pug.renderFile(
            file.path, {
                filename: file.path,
                pretty: true
            }
        ))
        cb(null, file)
    })
}

function htmlTask(dest) {
    return function () {
        return gulp.src('src/pug/**/*.pug')
            .pipe(buildHtml())
            .pipe(rename({
                extname: '.html'
            }))
            .pipe(gulp.dest(dest))
    }
}

function copyStaticTask(dest) {
    return function () {
        return gulp.src(['src/img/**', 'src/css/**', 'src/js/**'], {
            base: 'src'
        })
            .pipe(gulp.dest(dest))
    }
}
gulp.task('html', htmlTask('dist'))
gulp.task('copyStatic', copyStaticTask('dist'))
gulp.task('build', ['html', 'copyStatic'])
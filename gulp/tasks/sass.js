const _         = require('../plugin');
const dir       = require('../dir');

//scssコンパイルタスク
const scss = {
    sass: () => {
        return _.gulp.src(`${dir.src.scss}/**/*.scss`)
            .pipe(_.plumber({
                errorHandler: _.notify.onError({
                    message: 'Error: <%= error.message %>',
                    title: 'sass'
                })
            }))
            .pipe(_.sass({outputStyle: 'compressed'}).on('error', _.sass.logError))
            .pipe(_.autoprefixer({ cascade: false }))
            .pipe(_.gulp.dest(dir.dist.css));
    },
    mdSass: () => {
        return _.gulp.src(dir.src.mdscss)
            .pipe(_.plumber({
                errorHandler: _.notify.onError({
                    message: 'Error: <%= error.message %>',
                    title: 'mdSass'
                })
            }))
            .pipe(_.sass({outputStyle: 'compressed'}).on('error', _.sass.logError))
            .pipe(_.autoprefixer({ cascade: false }))
            .pipe(_.gulp.dest(dir.src.mdcsspath));
    }
};

module.exports = scss;

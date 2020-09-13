const _         = require('../plugin');
const dir       = require('../dir');
const md = require('./md-list');
const ejs = _.gulp.series(md.mdList, md.ejs);
const markdownPdf = _.gulp.series(md.mdList, md.markdownPdf);
const jsBuild = require('./js');
const scssTask = require('./sass');
const sass = scssTask.sass;
const mdSass = scssTask.mdSass;

//自動リロード
const browsersync = () => {
    _.browserSync.init({
        server: {
            baseDir: dir.dist.html
        },
        open: 'external'
    });

    const sEjs = _.gulp.series(ejs, _.browserSync.reload);
    _.gulp.watch(
        `${dir.src.ejs}/**/*.ejs`
    )
        .on('add',    sEjs)
        .on('change', sEjs)
        .on('unlink', sEjs);
    const sSass = _.gulp.series(sass, _.browserSync.reload);
    _.gulp.watch(
        `${dir.src.scss}/**/*.scss`
    )
        .on('add',    sSass)
        .on('change', sSass)
        .on('unlink', sSass);
    const sJs = _.gulp.series(jsBuild, _.browserSync.reload);
    _.gulp.watch(
        `${dir.src.js}/**/*.js`,
        {
            ignored: `${dir.src.js}/concat/**`
        }
    )
        .on('add',    sJs)
        .on('change', sJs)
        .on('unlink', sJs);
    const sContents = _.gulp.series(mdSass, markdownPdf, _.browserSync.reload);
    _.gulp.watch(
        [
            `${dir.src.md}/**/*.md`,
            dir.src.mdscss,
            `${dir.src.md}/img/**/*.+(jpg|jpeg|png|gif|svg)`
        ]
    )
        .on('add',    sContents)
        .on('change', sContents)
        .on('unlink', sContents);
    _.gulp.watch(
        `${dir.config.dir}/**/*.yml`
    )
        .on('add',    sEjs)
        .on('change', sEjs);
};

module.exports = browsersync;

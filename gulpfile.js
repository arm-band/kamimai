/**
 * gulp task
 *
 * @author    アルム＝バンド
 * @copyright Copyright (c) アルム＝バンド
 */
const _         = require('./gulp/plugin');
const browsersync = require('./gulp/tasks/browsersync');
const md = require('./gulp/tasks/md-list');
const ejs = _.gulp.series(md.mdList, md.ejs);
const markdownPdf = _.gulp.series(md.mdList, md.markdownPdf);
const inou = _.gulp.series(md.mdList, md.inou);
const jsBuild = require('./gulp/tasks/js');
const scssTask = require('./gulp/tasks/sass');
const sass = scssTask.sass;
const mdSass = scssTask.mdSass;

exports.mallet = _.gulp.series(_.gulp.series(mdSass, inou), (done) => {
    console.log(`The 30th day since July 1st passed safely!`);
    done();
});

const taskServer = _.gulp.series(browsersync);
exports.server = taskServer;

const taskBuild = _.gulp.parallel(_.gulp.series(mdSass, markdownPdf), sass, ejs, jsBuild);
exports.build = taskBuild;

//gulpのデフォルトタスクで諸々を動かす
exports.default = _.gulp.series(taskBuild, taskServer);
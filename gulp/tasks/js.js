const _         = require('../plugin');
const dir       = require('../dir');

//js圧縮&結合&リネーム
const jsConcat = () => {
    return _.gulp.src([`${dir.assets.jquery}/jquery.min.js`, `${dir.assets.easing}/jquery.easing.js`, `${dir.assets.pdfobject}/pdfobject.min.js`])
        .pipe(_.plumber({
            errorHandler: _.notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'jsConcat'
            })
        }))
        .pipe(_.concat('lib.js'))
        .pipe(_.gulp.dest(`${dir.src.js}/concat/`)); //srcとdistを別ディレクトリにしないと、自動でタスクが走る度にconcatしたものも雪だるま式に追加されていく
};
const jsUglifyLib = () => { //第2引数に先に実行して欲しい js.concat を指定する
    return _.gulp.src(`${dir.src.js}/concat/lib.js`)
        .pipe(_.plumber({
            errorHandler: _.notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'jsLibBuild'
            })
        }))
        .pipe(_.uglify({output: {comments: 'some'}}))
        .pipe(_.rename(`${dir.dist.js}/lib.min.js`))  // 出力するファイル名を変更
        .pipe(_.gulp.dest('./'));
};
const jsUglifyApp = () => {
    return _.gulp.src(`${dir.src.js}/index.js`)
        .pipe(_.plumber({
            errorHandler: _.notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'jsBuild'
            })
        }))
        .pipe(_.uglify({output: {comments: 'some'}}))
        .pipe(_.rename(`${dir.dist.js}/app.min.js`))
        .pipe(_.gulp.dest('./'));
};
//上記をまとめておく
module.exports = _.gulp.series(jsConcat, jsUglifyLib, jsUglifyApp);

const _         = require('../plugin');
const dir       = require('../dir');
const functions = require('../functions');

//markdown-pdfのオプション
const mPdfOpt = require('../mPdfOpt');
var mdList = [];

//markdownファイル一覧列挙
const md = {
    mdList: (done) => {
        const direc = dir.src.md + '/';
        _.fs.readdir(direc, function(err, files) {
            if (err) {
                throw err;
            }
            mdList = files.filter(function(file) {
                const filePath = direc + file;
                return _.fs.statSync(filePath).isFile() && /.*\.md$/.test(filePath); //絞り込み
            });
            done();
        });
    },
    ejs: () => {
        const config = functions.getConfig(dir.config.yaml);

        return _.gulp.src(
            `${dir.src.ejs}/**/*.ejs`,
            {
                ignore: `${dir.src.ejs}/**/_*.ejs` //_*.ejs(パーツ)とnews.ejs(別タスクで定義)はhtmlにしない
            }
        )
        .pipe(_.plumber({
            errorHandler: _.notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'ejs'
            })
        }))
        .pipe(_.ejs({ config, mdList }))
        .pipe(_.rename({ extname: '.html' }))
        .pipe(_.gulp.dest(dir.dist.html));
    },
    markdownPdf: (done) => {
        const config = functions.getConfig(dir.config.yaml);

        const src = mdList.map((d) => { return `${config.param.src}${d}` });
        const dist = mdList.map((d) => { return `${config.param.dist}${d.replace('.md', '.pdf')}` });
        _.markdownpdf(mPdfOpt).from(src).to(dist, () => {
            dist.forEach(function(d) {
                const filename = d.split('/');
                console.log(`${filename[filename.length - 1]} is generated!`);
            });
            done();
        });
    },
    inou: (done) => {
        const config = functions.getConfig(dir.config.yaml);

        const src = mdList.map((d) => { return `${config.param.src}${d}` });
        const dist = mdList.map((d) => { return `${dir.dist.result}/${d.replace('.md', '.pdf')}` });
        _.markdownpdf(mPdfOpt).from(src).to(dist, () => {
            dist.forEach(function(d) {
                var filename = d.split('/');
                console.log(`${filename[filename.length - 1]} is generated!`);
            });
            done();
        });
    }
}

module.exports = md;

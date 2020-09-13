//path difinition
module.exports = {
    assets: {
        jquery: './node_modules/jquery/dist',
        easing: './node_modules/jquery.easing',
        pdfobject: './node_modules/pdfobject'
    },
    src: {
        ejs: './src/ejs',
        scss: './src/scss',
        js: './src/js',
        md: './src/md',
        mdscss: './src/md/scss/style.scss',
        mdcsspath: './src/md/css',
        mdcss: './src/md/css/style.css'
    },
    config: {
        dir: './src/config',
        yaml: '/config.yml'
    },
    dist: {
        html: './dist',
        css: './dist/css',
        js: './dist/js',
        pdf: './dist/pdf',
        result: './results'
    }
};

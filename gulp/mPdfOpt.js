const dir       = require('./dir');

module.exports = {
    cssPath: dir.src.mdcss,
    remarkable: {
        html: true,
        breaks: true
    }
};

const _         = require('./plugin');
const dir       = require('./dir');

module.exports = {
    getConfig: (ymlFile, path = dir.config.dir) => { //yamlファイル取得
        const file = _.fs.readFileSync(path + ymlFile, 'utf8');
        return _.yaml.parse(file);
    }
};

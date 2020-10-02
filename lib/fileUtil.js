const fs = require('fs');
const path = require('path');
const Utils = require('./TestUtil');


module.exports = class FileUtil{
    constructor () {
    }

    getAllFiles(dir) {
        var files = [];
        const filenames = fs.readdirSync(dir);
        filenames.forEach((filename) => {
            const fullPath = path.join(dir, filename);
            const stats = fs.statSync(fullPath);
            if (stats.isFile()) {
                files.push(fullPath);
            } else if (stats.isDirectory()) {
                var newFs = this.getAllFiles(fullPath);
                Array.prototype.push.apply(files, newFs);
            }
        });
        return files;
    }

    getDirs(dir) {
        var files = [];
        const filenames = fs.readdirSync(dir);
        filenames.forEach((filename) => {
            const fullPath = path.join(dir, filename);
            const stats = fs.statSync(fullPath);
            if (stats.isFile()) {
            } else if (stats.isDirectory()) {
                files.push(fullPath);
                var newFs = this.getDirs(fullPath);
                Array.prototype.push.apply(files, newFs);
            }
        });
        return files;
    }
    getLS(dir) {
        var u = new Utils();
        return u.callCommand('ls -t '+dir);
    }
    // ディレクトリ作成    
    createPath (path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path,{ recursive: true });
        }
    }

    //ファイルの追記関数
    appendFile(path, data) {
        fs.appendFileSync(path, data, function (err) {
            if (err) {
                console.error(err);
                throw err;
            }
        });
    }

    getStream(path){
        return fs.createWriteStream(path,{flags: "a" });
    }

}
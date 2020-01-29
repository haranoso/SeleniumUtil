const resemble = require("resemblejs");
const fs = require('fs-extra');
var path = require('path');
const postImage= require('./postSlack');

module.exports = class ImageUtil{
    constructor (driver = null) {
        this.driver = driver;
    }

    imageDiff (srcA , srcB , newPath,border ){

        try{
            fs.statSync(srcA);
            fs.statSync(srcB);
        }catch (err){
            return '';
        }
        const imageBefore = fs.readFileSync(srcA);
        const imageAfter  = fs.readFileSync(srcB);

        let name = path.basename(srcA,path.extname(srcA));

        let misMatchPercentage = 0;
        // 前回と最新のスクショの差分を比較
        resemble(imageAfter).compareTo(imageBefore)
            .ignoreColors()
            .onComplete(function(data) {
                misMatchPercentage = data.misMatchPercentage;
                var fsname = newPath + name + '-diff_'+misMatchPercentage+'.png';
                fs.writeFileSync(fsname, data.getBuffer());
                if(misMatchPercentage > border){
                    console.log(fsname + '  difference:'+misMatchPercentage+'%');
                    postImage('差分あり' , fsname );

                }
                return '';
            });

        // 差分許容率はとりあえず１％にしておきます。
        // expect(misMatchPercentage).toBeLessThan(1);
    }
}
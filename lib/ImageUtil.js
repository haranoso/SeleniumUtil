const resemble = require("resemblejs");
const fs = require('fs-extra');
var path = require('path');
const SlackUtil= require('./SlackUtil');


module.exports = class ImageUtil{
    constructor () {
    }

    async imageDiff (srcA , srcB , newPath , postBorderMin ,postBorderMax){

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
                let s = new SlackUtil();
                misMatchPercentage = data.misMatchPercentage;
                if(misMatchPercentage > 0 ){
                    console.log('difference:'+misMatchPercentage+'%   ' + srcA);
                    s.postText('difference:'+misMatchPercentage+'%   ' + srcA );
                    var fsname = newPath +'/' + name + '-diff_'+misMatchPercentage+'.png';
                    fs.writeFileSync(fsname, data.getBuffer());
                    if(misMatchPercentage >= postBorderMin && misMatchPercentage < postBorderMax){
                        s.postImage(fsname , fsname );
                    }
                }
                return '';
            });

        // 差分許容率はとりあえず１％にしておきます。
        // expect(misMatchPercentage).toBeLessThan(1);
    }
}
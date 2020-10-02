const resemble = require("resemblejs");
const fs = require('fs-extra');
var path = require('path');
// const SlackUtil= require('./SlackUtil');


module.exports = class ImageUtil{

    constructor () {

    }

    async imageDiff (srcA , srcB , newPath ,onCompleteFunc){

        try{
            fs.statSync(srcA);
            fs.statSync(srcB);
        }catch (err){
            console.error(err);
            console.error(srcA,srcB);
            return '';
        }
        const imageBefore = fs.readFileSync(srcA);
        const imageAfter  = fs.readFileSync(srcB);

        let name = path.basename(srcA,path.extname(srcA));

        // 前回と最新のスクショの差分を比較
        await resemble(imageAfter).compareTo(imageBefore)
            .ignoreColors()
            .onComplete( 
                async function(data) {
                    const misMatchPercentage = data.misMatchPercentage;
                    const file = newPath +'/' + name + '-diff_'+misMatchPercentage+'.png';
                    fs.writeFileSync(file, data.getBuffer());
                    console.log(misMatchPercentage+','+file);                }
            );
        // 差分許容率はとりあえず１％にしておきます。
        // expect(misMatchPercentage).toBeLessThan(1);
    }


}
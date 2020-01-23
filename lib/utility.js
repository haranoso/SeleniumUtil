
const fs = require('fs');
const { promisify } = require('util');
const {until } = require('selenium-webdriver');

var execSync = require('child_process').execSync;

module.exports = class Utils{
    constructor (driver) {
        this.driver = driver;
    }

    // var users = u.callCommandJson('sfdx force:data:soql:query -q "select id , name ,ContactId from User where username=\''+config.TestUser+'\'" -r json');

    soql(soql){
        var ret = this.callCommandJson('sfdx force:data:soql:query -q "' + soql +'" -r json');
        if(ret != undefined){
            return ret.result.records;
        }
        return null;
    }

    // 同期コマンド実行
    callCommand(command){
        return execSync(command).toString();
    }
    // コマンド実行結果がJSONの場合、パースして返却する
    callCommandJson(command){
        return JSON.parse(this.callCommand(command));
    }

    // ディレクトリ作成    
    createSavePath (path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path,{ recursive: true });
        }
    }
      
    // スクリーンショットを取得して保存
    async takeScr( path , name ){
        this.createSavePath (path);
        let base64 = await this.driver.takeScreenshot();
        let buffer = Buffer.from(base64, 'base64');
        await promisify(fs.writeFile)(path+'/'+name, buffer);
    }

    // HTML要素の位置までスクロール
    async scroll( element ){
        await this.driver.executeScript("arguments[0].scrollIntoView(true);",element);
    }
    // Byで指定したHTML要素の位置までスクロール
    async scrollBy( byData ){
        await this.driver.executeScript("arguments[0].scrollIntoView(true);",this.driver.findElement(byData));
    }
    // Elementで指定したHTML要素をクリック
    async click( element ,bScroll = true){
        await this.waitForLoad(element);
        if(bScroll){
            await this.scroll(element);
        }
        await element.click();
    }
    // Byで指定したHTML要素をクリック
    async clickBy( byData ,bScroll = true){
        var element = await this.driver.findElement(byData)
        await this.click(element,bScroll);
    }
    
    // Byで指定したHTML要素をクリック
    async waitForLoadBy( byData ){
        await this.driver.wait(until.elementLocated(byData),10000);
    }
    
}
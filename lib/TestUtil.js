
const fs = require('fs');
const { promisify } = require('util');
const {until ,WebElementPromise ,bind} = require('selenium-webdriver');
const FileUtil= require('../lib/FileUtil');

const DEBUG = process.env.DEBUG;

var execSync = require('child_process').execSync;

module.exports = class TestUtil{
    constructor (driver = null) {
        this.driver = driver;
    }
    async switch(iframe){
        this.driver.switchTo().frame(iframe);
    }

    log(message){
        if(DEBUG=='true'){
            console.log(message);
        }
    }

    formatDate (d, format) {
        let date = new Date(d);
        format = format.replace(/yyyy/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
        return format;
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
    // var users = u.callCommandJson('sfdx force:data:soql:query -q "select id , name ,ContactId from User where username=\''+config.TestUser+'\'" -r json');

    soql(soql){
        this.log(soql);
        var ret = this.callCommandJson('sfdx force:data:soql:query -q "' + soql +'" -r json');
        if(ret != undefined || ret.result.totalSize > 0){
            return ret.result.records;
        }
        return null;
    }

    // 同期コマンド実行
    callCommand(command){
        return execSync(command,{timeout: 60 * 1000, }).toString();
    }
    // コマンド実行結果がJSONの場合、パースして返却する
    callCommandJson(command){
        return JSON.parse(this.callCommand(command));
    }


    // スクリーンショットを取得して保存
    async takeScr( path , name ,sleep=1500){
        this.log(name);
        await this.driver.sleep(sleep);
        var fu = new FileUtil();
        fu.createPath (path);
        let base64 = await this.driver.takeScreenshot();
        let buffer = Buffer.from(base64, 'base64');
        await promisify(fs.writeFile)(path+'/'+name, buffer);
        // console.log(name);
    }

    // HTML要素の位置までスクロール
    async scroll( element ){
        await this.driver.executeScript("arguments[0].scrollIntoView(true);",element);
        return element;
    }
    // Byで指定したHTML要素の位置までスクロール
    async scrollBy( byData ){
        let element = this.driver.findElement(byData);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);",element);
        return element;
    }
    // Elementで指定したHTML要素をクリック
    async click( element ,bScroll = true){
        if(bScroll){
            await this.scroll(element);
        }
        await element.click();
        return element;
    }
    // Byで指定したHTML要素をクリック
    async clickBy( byData ,bScroll = true){
        await this.waitForLoadBy(byData);
        var element = await this.driver.findElement(byData);
        await this.click(element,bScroll);
        return element;
    }
    
    // Byで指定したHTML要素をクリック
    async waitForLoadBy( byData ,wait = 30000){
        await this.driver.wait(until.elementLocated(byData),wait);
        var element = await this.driver.findElement(byData);
        return element;
    }

    // Byで指定したHTML要素を検索
    async finds( byData ,bScroll = false){
        var elements = await this.driver.findElements(byData);
        if(bScroll){
            await this.scroll(elements[0]);
        }
        return elements;
    }

    // Byで指定したHTML要素を検索
    async sendKeysBy( byData ,text ,bScroll = false){
        await this.waitForLoadBy(byData);
        var element = await this.driver.findElement(byData);
        if(bScroll){
            await this.scroll(element);
        }
        element.sendKeys(text);
        return element;
    }

    async hoverBy(byData){
        await this.waitForLoadBy(byData);
        var element = await this.driver.findElement(byData);
        await this.scroll(element);

        const actions = this.driver.actions();
        await actions.move({origin:element}).perform();
        await this.driver.sleep(1000);

    }
}
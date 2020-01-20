
const fs = require('fs');
const { promisify } = require('util');
const {Builder, By, Key, until , Actions } = require('selenium-webdriver');

module.exports = class Utils{
    constructor (driver) {
        this.driver = driver;
    }

    createSavePath (path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path,{ recursive: true });
        }
    }
      
    async takeScr( path , name ){
        this.createSavePath (path);
        let base64 = await this.driver.takeScreenshot();
        let buffer = Buffer.from(base64, 'base64');
        await promisify(fs.writeFile)(path+'/'+name, buffer);
    }

    async scrollToElement( element ){
        await this.driver.executeScript("arguments[0].scrollIntoView(true);",element);
    }
    async scrollBy( byData ){
        await this.driver.executeScript("arguments[0].scrollIntoView(true);",this.driver.findElement(byData));
    }

    async clickBy( byData ){
        await this.waitForLoadBy(byData);
        await this.scrollBy(byData);
        await this.driver.findElement(byData).click();
    }
    
    async waitForLoadBy( byData ){
        await this.driver.wait(until.elementLocated(byData),300000);
    }
}
const Utils = require('./lib/utility');
require('chromedriver');
require('geckodriver');

var assert = require('assert');

const {Builder, By, Key, until , Actions } = require('selenium-webdriver');



const config = {};
config.url = 'https://www.google.co.jp/';
config.outdir = 'ss';




testMain(process.argv[2]);
//  testMain('firefox');

async function testMain (browser){
    let driver = await new Builder().forBrowser(browser).build();
    let u = new Utils(driver);
    (function ( browser ){
        test('test001');
    }(browser));

    // テストその1
    async function test(name){
        const scrDir = "./scr/"+browser+'/'+name;

        try {
            await driver.get(config.url);

            await u.waitForLoadBy(By.name('q'));
        
            u.takeScr(scrDir,name+'-001.jpg');
        
            await driver.findElement(By.name("q")).sendKeys('selenium javascript',Key.ENTER);
            await u.takeScr(scrDir,name+'-002.jpg');
        
            await u.waitForLoadBy(By.name('pnnext'),12000);
            await u.scrollBy(By.id("pnnext"));
            await u.takeScr(scrDir,name+'-003.jpg');

            await u.clickBy(By.id("pnnext"));
            await u.takeScr(scrDir,name+'-004.jpg');

            await u.waitForLoadBy(By.name('pnnext'),13000);
            await u.takeScr(scrDir,name+'-005.jpg');

            var elmlast = null;
            var elements = driver.findElements(By.partialLinkText("Selenium"));
            for(let elm of (await elements)) {
              elmlast = elm;
            }
            if(elmlast!= null){
                await elmlast.click();
                await u.takeScr(scrDir,name+'-006.jpg');
            }
        
        }
        finally {
            await driver.quit();
            console.log(name+ ' done');
        }
    }
}
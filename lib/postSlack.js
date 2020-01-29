const { App } = require('@slack/bolt');
const fs = require('fs');

const _token = process.env.SLACK_TOKEN;
const channel=process.env.SLACK_CHANNNEL;
const ss = process.env.SLACK_SECRET_KEY;
const post = process.env.SLACK_POST_IMAGE;

module.exports = async function(title  ,file){
    if(post==='true'){
        const app = new App({
            token: _token,
            signingSecret: ss
        });
          
        try {
        app.client.files.upload({
            token: _token,
            channels: channel,
            title: file,
            filename: file,
            filetype: "auto",
            file: fs.createReadStream(file),
        });
        }
        catch (error) {
        console.error(error);
        }
    }
}

const { App } = require('@slack/bolt');
const fs = require('fs');

const token = process.env.SLACK_TOKEN;
const channel=process.env.SLACK_CHANNNEL;
const ss = process.env.SLACK_SECRET_KEY;
const post = process.env.SLACK_POST_IMAGE;

module.exports = class SlackUtil  {
    constructor () {
        this.app = new App({
            token: token,
            signingSecret: ss
        });
    }

    async postText( text ){
        if(post==='true'){
            try {
                this.app.client.chat.postMessage({
                    token: token,
                    channels: channel,
                    text: text,
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    async postImage( title  ,file ){
        if(post==='true'){
           
            try {
                this.app.client.files.upload({
                    token: token,
                    channels: channel,
                    title: title,
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
}

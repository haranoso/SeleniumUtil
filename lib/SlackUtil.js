const { App } = require('@slack/bolt');
const fs = require('fs');

const token = process.env.SLACK_TOKEN;
const channel=process.env.SLACK_CHANNEL;
const ss = process.env.SLACK_SECRET_KEY;
const post = process.env.SLACK_POST_IMAGE;

module.exports = class SlackUtil  {
    constructor () {
        this.app = new App({
            token: token,
            signingSecret: ss
        });
    }

    async getChannels(){
        try {
            var res = await this.app.client.channels.list({
                token: token,
            });
            let json = await ( res );
            let channels = json.channels;
            for (var idx in channels){
                if(channels[idx].name == channel){
                    return  await channels[idx].id;
                }
            }
        }
        catch (error) {
            // console.error(error);
        }

    }
    async postText( text ){
        if(post==='true'){
            this.channelId = await this.getChannels();
            try {
                this.app.client.chat.postMessage({
                    token: token,
                    channel:this.channelId,
                    text: text
                });
            }
            catch (error) {
                // console.error(error);
            }
        }
        else{
            console.log('not post');
        }
    }
    async postImage( title  ,file ){
        if(post==='true'){
            this.channelId = await this.getChannels();
            try {
                var response = this.app.client.files.upload({
                    token: token,
                    channels: this.channelId,
                    title: title,
                    filename: file,
                    filetype: "auto",
                    file: fs.createReadStream(file)
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        else{
            console.log('not post');
        }
    }
}
